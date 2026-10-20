// src/app/api/clinic/add-doctors/route.ts
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

const doctorSchema = z.object({
    name: z.string().trim().min(2, "Doctor name is required").max(100),
    specialtySlug: z.string().refine((s) => SPECIALTY_SLUGS.has(s), "Invalid specialty"),
    description: z
        .string()
        .trim()
        .max(500, "Description is too long")
        .optional()
        .transform((v) => v || null),
    schedules: z.array(scheduleSchema).min(1, "Add at least one schedule").max(21),
});

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

// Clerk login -> approved clinic check -> clinic id. Returns either { clinicId } or { error }
async function getClinicId(): Promise<{ clinicId: string } | { error: NextResponse }> {
    const { userId } = await auth();
    if (!userId) return { error: json("unauthorized", 401) };

    // authClinic returns the clinic id, or a ready-made error response
    // (no clinic yet / not approved yet). A response object is always truthy,
    // so it must be checked with instanceof, never with `!clinicId`.
    const clinicId = await authClinic(userId);
    if (clinicId instanceof NextResponse) return { error: clinicId };

    return { clinicId };
}

/* ---------------------------------- POST --------------------------------- */

export async function POST(request: Request) {
    const result = await getClinicId();
    if ("error" in result) return result.error;

    let uploaded: { url: string; fileId: string } | null = null;

    try {
        const form = await request.formData();

        // 1. parse + validate everything BEFORE uploading the photo
        let rawSchedules: unknown;
        try {
            rawSchedules = JSON.parse(String(form.get("schedules") ?? "[]"));
        } catch {
            return json("Invalid schedules data", 400);
        }

        const parsed = doctorSchema.safeParse({
            name: form.get("name") ?? "",
            specialtySlug: form.get("specialtySlug") ?? "",
            description: String(form.get("description") ?? ""),
            schedules: rawSchedules,
        });
        if (!parsed.success) {
            const issue = parsed.error.issues[0];
            const field = issue.path.join(".");
            return json(field ? `${field}: ${issue.message}` : issue.message, 400);
        }
        const data = parsed.data;

        const overlap = findOverlap(data.schedules);
        if (overlap) return json(overlap, 400);

        const image = form.get("image");
        const hasImage = image instanceof File && image.size > 0;
        if (hasImage) {
            if (!IMAGE_TYPES.includes(image.type)) {
                return json("Image must be JPG, PNG or WEBP", 400);
            }
            if (image.size > MAX_IMAGE_SIZE) {
                return json("Image must be smaller than 5 MB", 400);
            }
        }

        // 2. upload photo (only after validation passed)
        if (hasImage) {
            uploaded = await imagekit.upload({
                file: Buffer.from(await image.arrayBuffer()),
                fileName: image.name,
                folder: "DoctorImages",
            });
        }

        // 3. create doctor with schedules
        const doctor = await prisma.doctor.create({
            data: {
                name: data.name,
                specialtySlug: data.specialtySlug,
                description: data.description,
                image: uploaded?.url ?? null,
                clinicId: result.clinicId,
                schedules: {
                    create: data.schedules.map((s) => ({
                        day: s.day,
                        startTime: s.startTime,
                        endTime: s.endTime,
                        bookingCloseTime: s.bookingCloseTime,
                    })),
                },
            },
            select: { id: true },
        });

        return NextResponse.json({ id: doctor.id }, { status: 201 });
    } catch (err) {
        console.error("POST /api/clinic/add-doctors", err);

        // DB or any later step failed: remove the photo we already uploaded
        if (uploaded) await imagekit.deleteFile(uploaded.fileId).catch(() => {});

        // unique constraint on (doctorId, day, startTime)
        if ((err as { code?: string })?.code === "P2002") {
            return json("Two schedules have the same day and start time", 409);
        }
        return json("Could not add the doctor. Please try again.", 500);
    }
}

/* ----------------------------------- GET ---------------------------------- */

export async function GET() {
    const result = await getClinicId();
    if ("error" in result) return result.error;

    try {
        const doctors = await prisma.doctor.findMany({
            where: { clinicId: result.clinicId },
            orderBy: { createdAt: "desc" },
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

        return NextResponse.json({ doctors });
    } catch (err) {
        console.error("GET /api/clinic/add-doctors", err);
        return json("Could not load your doctors. Please try again.", 500);
    }
}