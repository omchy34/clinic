// app/api/user/all-clinic/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nowIn, weekdayOf } from "@/lib/booking";

import { todayHours } from "@/lib/clinicHours";
import { SPECIALTY_BY_SLUG } from "@/app/clinic/doctors/shared";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
  const now = nowIn("Asia/Kolkata");

  try {
    const today = weekdayOf(now.date);

    const rows = await prisma.clinic.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        logo: true,
        doctors: {
          where: { isActive: true },
          select: {
            specialtySlug: true,
            schedules: { where: { day: today }, select: { startTime: true, endTime: true } }, // sirf aaj ke
          },
        },
      },
    });

    const clinics = rows
      .filter((c) => c.doctors.length > 0) // bina doctor wale clinic me booking nahi ho sakti
      .map(({ doctors, ...c }) => ({
        ...c,
        doctorCount: doctors.length,
        specialties: [
          ...new Set(doctors.map((d) => SPECIALTY_BY_SLUG.get(d.specialtySlug)?.name).filter(Boolean)),
        ] as string[],
        hours: todayHours(doctors.flatMap((d) => d.schedules), now.minutes),
      }));

    return NextResponse.json({ clinics });
  } catch (err) {
    console.error("GET /api/user/all-clinic", err);
    return NextResponse.json({ message: "Could not load clinics. Please try again." }, { status: 500 });
  }
}