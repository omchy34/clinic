// app/api/user/create/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import imagekit from "@/config/imageKit";

const TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_PHOTOS = 8;
const LOGO_MB = 2;
const PHOTO_MB = 5;

// Browser bina file chune bhi ek khali File bhejta hai (size 0), use "file nahi hai" maano
function isRealFile(v: FormDataEntryValue | null): v is File {
  return v instanceof File && v.size > 0;
}

function checkFile(file: File, maxMb: number): string | null {
  if (!TYPES.includes(file.type)) return "Only JPG, PNG or WebP images are allowed";
  if (file.size > maxMb * 1024 * 1024) return `Each image must be under ${maxMb} MB`;
  return null;
}

async function uploadOne(file: File, folder: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return imagekit.upload({ file: buffer, fileName: file.name, folder });
}

// Cleanup function to delete uploaded files
async function cleanup(fileIds: string[]) {
  await Promise.allSettled(fileIds.map((id) => imagekit.deleteFile(id)));
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();

    if (!name || !address || !city || !phone || !email) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ message: "Enter a valid 10-digit mobile number" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return NextResponse.json({ message: "Enter a valid email address" }, { status: 400 });
    }
    if (name.length > 100 || address.length > 300 || city.length > 60) {
      return NextResponse.json({ message: "One of the fields is too long" }, { status: 400 });
    }

    // ---------- files ----------
    const logoEntry = formData.get("logo");
    const logo = isRealFile(logoEntry) ? logoEntry : null;
    const photos = formData.getAll("clinicImage").filter(isRealFile);

    if (photos.length > MAX_PHOTOS) {
      return NextResponse.json({ message: `You can upload up to ${MAX_PHOTOS} photos` }, { status: 400 });
    }

    const logoProblem = logo ? checkFile(logo, LOGO_MB) : null;
    const photoProblem = photos.map((f) => checkFile(f, PHOTO_MB)).find(Boolean) ?? null;
    const problem = logoProblem ?? photoProblem;
    if (problem) {
      return NextResponse.json({ message: problem }, { status: 400 });
    }

    // ---------- account checks ----------
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (!user) {
      return NextResponse.json(
        { message: "Your account is still being set up. Please try again in a moment." },
        { status: 409 }
      );
    }

    const existing = await prisma.clinic.findUnique({ where: { userId } });
    if (existing) {
      return NextResponse.json(
        { message: "You have already registered a clinic", approved: existing.isApproved },
        { status: 409 }
      );
    }

    // ---------- upload images ----------
    const logoJob = logo ? uploadOne(logo, "ClinicLogos") : Promise.resolve(null);
    const photoJobs = photos.map((p) => uploadOne(p, "ClinicImages"));

    const [logoResult, ...photoResults] = await Promise.allSettled([logoJob, ...photoJobs]);
    const settled = [logoResult, ...photoResults];

    const fileIds = settled.flatMap((r) =>
      r.status === "fulfilled" && r.value ? [r.value.fileId] : []
    );

    if (settled.some((r) => r.status === "rejected")) {
      await cleanup(fileIds);
      return NextResponse.json(
        { message: "Image upload failed. Please try again." },
        { status: 502 }
      );
    }

    const logoUrl =
      logoResult.status === "fulfilled" && logoResult.value ? logoResult.value.url : null;
    const photoUrls = photoResults.flatMap((r) =>
      r.status === "fulfilled" && r.value ? [r.value.url] : []
    );

    // ---------- save ----------
    try {
      await prisma.clinic.create({
        data: {
          userId,
          name,
          address,
          city,
          phone,
          email,
          logo: logoUrl,
          clinicImage: photoUrls,
        },
      });
    } catch (e) {
      await cleanup(fileIds);
      throw e;
    }

    return NextResponse.json({ message: "Applied, waiting for approval" }, { status: 201 });
  } catch (error) {
    console.error("POST /api/user/create", error);
    if ((error as { code?: string })?.code === "P2002") {
      return NextResponse.json({ message: "You have already registered a clinic" }, { status: 409 });
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// Registered or not
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const clinic = await prisma.clinic.findUnique({
      where: { userId },
      select: { isApproved: true },
    });

    const state = !clinic ? "none" : clinic.isApproved ? true : false;
    return NextResponse.json({ state });
  } catch (error) {
    console.error("GET /api/user/create", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}