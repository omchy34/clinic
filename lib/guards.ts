// src/lib/guards.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/booking-server";

export async function requireUser() {
  const { userId } = await auth();
  if (!userId) throw new ApiError(401, "unauthorized");
  return userId;
}

// Logged-in owner of an approved clinic
export async function requireClinic() {
  const userId = await requireUser();

  const clinic = await prisma.clinic.findUnique({
    where: { userId },
    select: { id: true, timezone: true, isApproved: true },
  });
  if (!clinic) throw new ApiError(404, "clinic not found");
  if (!clinic.isApproved) throw new ApiError(403, "clinic not approved");

  return { userId, clinic: { id: clinic.id, timezone: clinic.timezone } };
}