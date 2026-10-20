// app/api/clinic/dashboard/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import authClinic from "@/middlewere/authClinic";
import { bookingLabel, bookingStatus, todayIn, weekdayOf } from "@/lib/booking";

const json = (message: string, status: number) => NextResponse.json({ message }, { status });

export async function GET() {
    const { userId } = await auth();
    if (!userId) return json("unauthorized", 401);

    const clinicId = await authClinic(userId);
    if (clinicId instanceof NextResponse) return clinicId;

    try {
        const clinic = await prisma.clinic.findUnique({
            where: { id: clinicId },
            select: { timezone: true },
        });
        if (!clinic) return json("Clinic not found", 404);

        const tz = clinic.timezone;
        const todayStr = todayIn(tz); // "2026-10-20" in the clinic's time zone
        const today = new Date(`${todayStr}T00:00:00Z`); // matches the @db.Date column

        const [
            totalDoctors,
            activeDoctors,
            doctorsSittingToday,
            tokensByStatus,
            patientGroups,
            todaySessions,
        ] = await Promise.all([
            prisma.doctor.count({ where: { clinicId } }),

            prisma.doctor.count({ where: { clinicId, isActive: true } }),

            // active doctors whose weekly schedule says they sit today
            prisma.doctor.count({
                where: {
                    clinicId,
                    isActive: true,
                    schedules: { some: { day: weekdayOf(todayStr) } },
                },
            }),

            // today's tokens grouped by status
            prisma.booking.groupBy({
                by: ["status"],
                where: { clinicId, session: { date: today } },
                _count: { _all: true },
            }),

            // unique patients who have booked at this clinic
            prisma.booking.groupBy({
                by: ["userId"],
                where: { clinicId },
            }),

            // today's sessions with live queue state
            prisma.doctorSession.findMany({
                where: { date: today, doctor: { clinicId } },
                orderBy: { startTime: "asc" },
                select: {
                    id: true,
                    startTime: true,
                    endTime: true,
                    queueStatus: true,
                    queueVersion: true,
                    bookingOpensAt: true,
                    bookingClosesAt: true,
                    bookingExtended: true,
                    bookingManuallyClosed: true,
                    doctor: { select: { id: true, name: true, image: true } },
                    servingBooking: { select: { tokenNumber: true } },
                    _count: {
                        select: { bookings: { where: { status: { not: "CANCELLED" } } } },
                    },
                },
            }),
        ]);

        const count = (status: string) =>
            tokensByStatus.find((r) => r.status === status)?._count._all ?? 0;

        const waiting = count("CONFIRMED");
        const serving = count("SERVING");
        const completed = count("COMPLETED");
        const cancelled = count("CANCELLED");

        return NextResponse.json({
            timezone: tz,
            date: todayStr,

            totalDoctors,
            activeDoctors,
            doctorsSittingToday,

            todayTokens: waiting + serving + completed, // cancelled not included
            tokens: { waiting, serving, completed, cancelled },

            totalPatients: patientGroups.length,

            todaySessions: todaySessions.map((s) => {
                const status = bookingStatus(s); // same rule the patient page and booking API use
                return {
                    id: s.id,
                    doctor: s.doctor,
                    startTime: s.startTime,
                    endTime: s.endTime,
                    queueStatus: s.queueStatus,
                    nowServing: s.servingBooking?.tokenNumber ?? null,
                    tokensBooked: s._count.bookings,
                    booking: {
                        status,
                        label: bookingLabel(status, s.bookingClosesAt, tz),
                    },
                };
            }),
        });
    } catch (err) {
        console.error("GET /api/clinic/dashboard", err);
        return json("Could not load the dashboard. Please try again.", 500);
    }
}