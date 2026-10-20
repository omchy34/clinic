// src/lib/guards.ts
// Login checks for API routes. They throw an ApiError, so routes just wrap them in try/catch.

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import authClinic from "@/middlewere/authClinic";
import { ApiError } from "@/lib/apiError";

export async function requireUser() {
  const { userId } = await auth();
  if (!userId) throw new ApiError("unauthorized", 401);
  return userId;
}

// Logged-in clinic owner, with the clinic settings the queue needs
export async function requireClinic() {
  const userId = await requireUser();
  if (!(await authClinic(userId))) throw new ApiError("not authorized", 403);

  const clinic = await prisma.clinic.findUnique({
    where: { userId },
    select: { id: true, timezone: true, waitingAllowanceMinutes: true, maxSkips: true },
  });
  if (!clinic) throw new ApiError("clinic not found", 404);

  return { userId, clinic };
}