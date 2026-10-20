// middleware/authClinic.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Returns the clinic id if this user owns an APPROVED clinic.
// Otherwise it returns a ready-made error response, so every caller must do:
//
//   const clinicId = await authClinic(userId);
//   if (clinicId instanceof NextResponse) return clinicId;
//
// Never use `if (!clinicId)`: a NextResponse object is always truthy.
export default async function authClinic(userId: string): Promise<string | NextResponse> {
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const clinic = await prisma.clinic.findUnique({
      where: { userId },
      select: { id: true, isApproved: true },
    });

    if (!clinic) {
      return NextResponse.json(
        { message: "You don't have a clinic", code: "NO_CLINIC" },
        { status: 403 }
      );
    }
    if (!clinic.isApproved) {
      return NextResponse.json(
        { message: "Your clinic is not approved yet", code: "NOT_APPROVED" },
        { status: 403 }
      );
    }

    return clinic.id;
  } catch (error) {
    console.error("authClinic", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}