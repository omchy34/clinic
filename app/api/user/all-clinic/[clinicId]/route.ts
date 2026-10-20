// app/api/user/clinics/[clinicId]/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nowIn, weekdayOf } from "@/lib/booking";
import { todayHours } from "@/lib/clinicHours";

export async function GET(_req: Request, { params }: { params: Promise<{ clinicId: string }> }) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
  const { clinicId } = await params;

  try {

    const clinic = await prisma.clinic.findFirst({
      where: { id: clinicId, isApproved: true },
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        phone: true,
        email: true,
        logo: true,
        clinicImage: true,
        doctors: {
          where: { isActive: true },
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
            specialtySlug: true,
            schedules: {
              select: {
                day: true,
                startTime: true,
                endTime: true,
                bookingCloseTime: true, // optional, only if the doctor cards show it
              },
            },
          },
        },
      },
    });

    if (!clinic) return NextResponse.json({ message: "Clinic not found" }, { status: 404 });
    const now = nowIn("Asia/Kolkata");
    const today = weekdayOf(now.date);
    const hours = todayHours(
      clinic.doctors.flatMap((d) => d.schedules.filter((s) => s.day === today)),
      now.minutes
    );

    return NextResponse.json({ clinic: { ...clinic, hours } });
  } catch (err) {
    console.error("GET /api/user/clinics/[clinicId]", err);
    return NextResponse.json({ message: "Could not load the clinic. Please try again." }, { status: 500 });
  }
}