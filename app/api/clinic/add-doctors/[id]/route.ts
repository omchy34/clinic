import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import imagekit from "@/config/imageKit";
import { prisma } from "@/lib/prisma";
import authClinic from "@/middlewere/authClinic";
import specialties from "@/data/specialties.json";

/* ------------------------------ validation ------------------------------ */

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/; // "HH:mm" (24 hour)
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Adjust the cast if your specialties.json has a different shape
const SPECIALTY_SLUGS = new Set(
    (specialties as unknown as { slug: string }[]).map((s) => s.slug)
);

const scheduleSchema = z
    .object({
        day: z.enum(DAYS),
        startTime: z.string().regex(TIME, "startTime must be HH:mm"),
        endTime: z.string().regex(TIME, "endTime must be HH:mm"),
        // clinic local time. empty / missing = booking closes when the session ends
        bookingCloseTime: z
            .union([z.string().regex(TIME, "bookingCloseTime must be HH:mm"), z.literal(""), z.null()])
            .optional()
            .transform((v) => v || null),
    })
    .refine((s) => s.startTime < s.endTime, {
        message: "endTime must be after startTime",
        path: ["endTime"],
    })
    .refine((s) => !s.bookingCloseTime || s.bookingCloseTime <= s.endTime, {
        message: "bookingCloseTime cannot be after the session endTime",
        path: ["bookingCloseTime"],
    });

// Every field is optional: only the fields that are sent get updated
const editSchema = z.object({
    name: z.string().trim().min(2, "Doctor name is required").max(100).optional(),
    specialtySlug: z
        .string()
        .refine((s) => SPECIALTY_SLUGS.has(s), "Invalid specialty")
        .optional(),
    // empty string clears the description
    description: z
        .string()
        .trim()
        .max(500, "Description is too long")
        .transform((v) => v || null)
        .optional(),
    isActive: z.boolean().optional(),
    // when sent, REPLACES all weekly schedules of this doctor
    schedules: z.array(scheduleSchema).min(1, "Add at least one schedule").max(21).optional(),
});

const toggleSchema = z.object({ isActive: z.boolean() });

type Schedule = z.infer<typeof scheduleSchema>;

// Two sessions of the same doctor on the same day must not overlap
function findOverlap(schedules: Schedule[]): string | null {
    for (const day of DAYS) {
        const list = schedules
            .filter((s) => s.day === day)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
        for (let i = 1; i < list.length; i++) {
            if (list[i].startTime < list[i - 1].endTime) {
                return `Schedules on ${day} overlap (${list[i - 1].startTime}-${list[i - 1].endTime} and ${list[i].startTime}-${list[i].endTime})`;
            }
        }
    }
    return null;
}

/* -------------------------------- helpers -------------------------------- */

const json = (message: string, status: number) => NextResponse.json({ message }, { status });

type Ctx = { params: Promise<{ id: string }> };

// Clerk login -> approved clinic check -> clinic id. Returns either { clinicId } or { error }
async function getClinicId(): Promise<{ clinicId: string } | { error: NextResponse }> {
    const { userId } = await auth();
    if (!userId) return { error: json("unauthorized", 401) };

    // authClinic returns the clinic id, or a ready-made error response.
    // A response object is always truthy, so check with instanceof.
    const clinicId = await authClinic(userId);
    if (clinicId instanceof NextResponse) return { error: clinicId };

    return { clinicId };
}

const parseBool = (v: FormDataEntryValue | null) =>
    v === "true" ? true : v === "false" ? false : undefined;

/* ----------------------------------- GET ---------------------------------- */

export async function GET(_req: Request, { params }: Ctx) {
    const { id } = await params;
    const result = await getClinicId();
    if ("error" in result) return result.error;

    try {
        const doctor = await prisma.doctor.findFirst({
            where: { id, clinicId: result.clinicId }, // clinic can only see its own doctors
            select: {
                id: true,
                name: true,
                image: true,
                description: true,
                isActive: true,
                specialtySlug: true,
                schedules: {
                    select: {
                        id: true,
                        day: true,
                        startTime: true,
                        endTime: true,
                        bookingCloseTime: true,
                    },
                    orderBy: [{ day: "asc" }, { startTime: "asc" }],
                },
            },
        });
        if (!doctor) return json("Doctor not found", 404);

        return NextResponse.json({ doctor });
    } catch (err) {
        console.error("GET /api/clinic/doctors/[id]", err);
        return json("Could not load the doctor. Please try again.", 500);
    }
}

/* ---------------------------------- PATCH --------------------------------- */

export async function PATCH(request: Request, { params }: Ctx) {
    const { id } = await params;
    const result = await getClinicId();
    if ("error" in result) return result.error;

    let uploaded: { url: string; fileId: string } | null = null;

    try {
        // ownership check: doctor must belong to this clinic
        const existing = await prisma.doctor.findFirst({
            where: { id, clinicId: result.clinicId },
            select: { id: true },
        });
        if (!existing) return json("Doctor not found", 404);

        const contentType = request.headers.get("content-type") ?? "";

        /* ---- A) quick on/off toggle (JSON body) ---- */
        if (contentType.includes("application/json")) {
            const body = toggleSchema.safeParse(await request.json().catch(() => null));
            if (!body.success) return json("isActive (true/false) is required", 400);

            const doctor = await prisma.doctor.update({
                where: { id },
                data: { isActive: body.data.isActive },
                select: { id: true, isActive: true },
            });
            return NextResponse.json({ doctor });
        }

        /* ---- B) full / partial edit (multipart form) ---- */
        const form = await request.formData();

        let rawSchedules: unknown = undefined;
        if (form.has("schedules")) {
            try {
                rawSchedules = JSON.parse(String(form.get("schedules")));
            } catch {
                return json("Invalid schedules data", 400);
            }
        }

        // only include keys that were actually sent
        const input = {
            ...(form.has("name") && { name: String(form.get("name")) }),
            ...(form.has("specialtySlug") && { specialtySlug: String(form.get("specialtySlug")) }),
            ...(form.has("description") && { description: String(form.get("description")) }),
            ...(form.has("isActive") && { isActive: parseBool(form.get("isActive")) }),
            ...(rawSchedules !== undefined && { schedules: rawSchedules }),
        };

        const parsed = editSchema.safeParse(input);
        if (!parsed.success) {
            const issue = parsed.error.issues[0];
            const field = issue.path.join(".");
            return json(field ? `${field}: ${issue.message}` : issue.message, 400);
        }
        const data = parsed.data;

        if (data.schedules) {
            const overlap = findOverlap(data.schedules);
            if (overlap) return json(overlap, 400);
        }

        // image: a new file replaces the old one, removeImage=true clears it
        const image = form.get("image");
        const hasImage = image instanceof File && image.size > 0;
        const removeImage = form.get("removeImage") === "true";
        if (hasImage) {
            if (!IMAGE_TYPES.includes(image.type)) return json("Image must be JPG, PNG or WEBP", 400);
            if (image.size > MAX_IMAGE_SIZE) return json("Image must be smaller than 5 MB", 400);
        }

        if (Object.keys(data).length === 0 && !hasImage && !removeImage) {
            return json("Nothing to update", 400);
        }

        // upload only after validation passed
        if (hasImage) {
            uploaded = await imagekit.upload({
                file: Buffer.from(await image.arrayBuffer()),
                fileName: image.name,
                folder: "DoctorImages",
            });
        }

        // delete + recreate schedules and update the doctor in ONE transaction
        const doctor = await prisma.$transaction(async (tx) => {
            if (data.schedules) {
                await tx.doctorSchedule.deleteMany({ where: { doctorId: id } });
            }

            return tx.doctor.update({
                where: { id },
                data: {
                    name: data.name,
                    specialtySlug: data.specialtySlug,
                    description: data.description, // undefined = unchanged, null = cleared
                    isActive: data.isActive,
                    ...(uploaded ? { image: uploaded.url } : removeImage ? { image: null } : {}),
                    ...(data.schedules && {
                        schedules: {
                            create: data.schedules.map((s) => ({
                                day: s.day,
                                startTime: s.startTime,
                                endTime: s.endTime,
                                bookingCloseTime: s.bookingCloseTime,
                            })),
                        },
                    }),
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                    description: true,
                    isActive: true,
                    specialtySlug: true,
                    schedules: {
                        select: {
                            id: true,
                            day: true,
                            startTime: true,
                            endTime: true,
                            bookingCloseTime: true,
                        },
                        orderBy: [{ day: "asc" }, { startTime: "asc" }],
                    },
                },
            });
        });

        return NextResponse.json({ doctor });
    } catch (err) {
        console.error("PATCH /api/clinic/doctors/[id]", err);

        // DB failed: remove the photo we just uploaded
        if (uploaded) await imagekit.deleteFile(uploaded.fileId).catch(() => {});

        // unique constraint on (doctorId, day, startTime)
        if ((err as { code?: string })?.code === "P2002") {
            return json("Two schedules have the same day and start time", 409);
        }
        return json("Could not update the doctor. Please try again.", 500);
    }
}