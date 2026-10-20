import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { todayIn } from "@/lib/booking";

const json = (message: string, status: number) => NextResponse.json({ message }, { status });

const ymd = (d: Date) => d.toISOString().slice(0, 10); // @db.Date is stored as midnight UTC

export async function GET() {
    const { userId } = await auth();
    if (!userId) return json("unauthorized", 401);

    try {
        // only the next 4 tokens still in play: waiting or being served, session not ended
        const bookings = await prisma.booking.findMany({
            where: {
                userId,
                status: { in: ["CONFIRMED", "SERVING"] },
                session: { queueStatus: { not: "ENDED" } },
            },
            orderBy: [{ session: { date: "asc" } }, { session: { startTime: "asc" } }, { tokenNumber: "asc" }],
            take: 4,
            select: {
                id: true,
                tokenNumber: true,
                queuePosition: true,
                status: true,
                clinic: { select: { name: true, timezone: true } },
                session: {
                    select: {
                        id: true,
                        date: true,
                        startTime: true,
                        endTime: true,
                        servingBooking: { select: { tokenNumber: true } },
                        doctor: { select: { name: true } },
                    },
                },
            },
        });

        // "people ahead" is only worked out for the first token (the one shown in the big card)
        const first = bookings[0];
        let ahead = 0;
        if (first && first.status === "CONFIRMED") {
            const waitingAhead = await prisma.booking.count({
                where: {
                    sessionId: first.session.id,
                    status: "CONFIRMED",
                    queuePosition: { lt: first.queuePosition },
                },
            });
            ahead = waitingAhead + (first.session.servingBooking ? 1 : 0); // the one being served is ahead too
        }

        return NextResponse.json({
            tokens: bookings.map((b, i) => ({
                id: b.id,
                tokenNumber: b.tokenNumber,
                status: b.status,
                clinicName: b.clinic.name,
                doctorName: b.session.doctor.name,
                date: ymd(b.session.date),
                isToday: ymd(b.session.date) === todayIn(b.clinic.timezone),
                startTime: b.session.startTime,
                endTime: b.session.endTime,
                nowServing: b.session.servingBooking?.tokenNumber ?? null,
                ahead: i === 0 ? ahead : null,
            })),
        });
    } catch (err) {
        console.error("GET /api/user/dashboard", err);
        return json("Could not load your dashboard. Please try again.", 500);
    }
}