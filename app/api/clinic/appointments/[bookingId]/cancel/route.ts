import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const json = (message: string, status: number) => NextResponse.json({ message }, { status });

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(_req: Request, { params }: Ctx) {
    const { id } = await params;
    const { userId } = await auth();
    if (!userId) return json("unauthorized", 401);

    try {
        const cancelled = await prisma.$transaction(async (tx) => {
            // One conditional update: only YOUR token, only while it is waiting in the queue
            const { count } = await tx.booking.updateMany({
                where: {
                    id,
                    userId,
                    status: "CONFIRMED", // not SERVING, not COMPLETED, not CANCELLED
                    session: { queueStatus: { not: "ENDED" } },
                },
                data: { status: "CANCELLED", cancelledAt: new Date() },
            });
            if (count === 0) return false;

            const booking = await tx.booking.findUnique({
                where: { id },
                select: { sessionId: true },
            });
            // patient and clinic pages poll this number, so they refresh right away
            await tx.doctorSession.update({
                where: { id: booking!.sessionId },
                data: { queueVersion: { increment: 1 } },
            });
            return true;
        });

        if (cancelled) return NextResponse.json({ id, status: "CANCELLED" });

        // Nothing was cancelled: find out why, so the patient gets a clear message
        const booking = await prisma.booking.findFirst({
            where: { id, userId },
            select: { status: true, session: { select: { queueStatus: true } } },
        });
        if (!booking) return json("Token not found", 404);

        switch (booking.status) {
            case "SERVING":
                return json("The doctor is already seeing you, so this token can no longer be cancelled", 409);
            case "COMPLETED":
                return json("This token is already completed", 409);
            case "CANCELLED":
                return json("This token is already cancelled", 409);
            default:
                return json("This session has ended", 409);
        }
    } catch (err) {
        console.error("PATCH /api/user/bookings/[id]/cancel", err);
        return json("Could not cancel the token. Please try again.", 500);
    }
}