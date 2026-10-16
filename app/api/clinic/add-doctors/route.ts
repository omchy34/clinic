import authClinic from "@/middlewere/authClinic";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const isClinic = await authClinic(userId);

    if (!isClinic) {
        return NextResponse.json({ message: "not authorized" }, { status: 401 })
    }


}

export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const isClinic = await authClinic(userId);

    if (!isClinic) {
        return NextResponse.json({ message: "not authorized" }, { status: 401 })
    }

    const 
}