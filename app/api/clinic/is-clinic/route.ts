// app/api/clinic/is-clinic/route.ts

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import authClinic from "@/middlewere/authClinic";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Clinic id, or a 403 response (no clinic / not approved yet)
    const clinicId = await authClinic(userId);
    if (clinicId instanceof NextResponse) return clinicId;

    const storeInfo = await prisma.clinic.findUnique({ where: { id: clinicId } });

    return NextResponse.json({ isClinic: clinicId, storeInfo });
  } catch (error) {
    console.error("GET /api/clinic/is-clinic", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}