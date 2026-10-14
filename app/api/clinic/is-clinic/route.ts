// app/api/clinic/is-clinic/route.ts

import { prisma } from "@/lib/prisma";
import authClinic from "@/middlewere/authClinic";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {

        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ message: "unauthrized"}, { status: 401 });
        }

        const isClinic = await authClinic(userId);

        if (isClinic instanceof NextResponse) return isClinic;
        if (!isClinic) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
        }

        const storeInfo = await prisma.clinic.findUnique({
            where: { userId }
        })

        return NextResponse.json({ isClinic, storeInfo }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}