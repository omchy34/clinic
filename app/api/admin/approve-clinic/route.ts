import { prisma } from "@/lib/prisma";
import authAdmin from "@/middlewere/authAdmin";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request: Request) {


    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ message: "unauthrized" }, { status: 401 })
        }
        const isAdmin = await authAdmin(userId);
        if (!isAdmin) {
            return NextResponse.json({ message: "not authorized" }, { status: 401 })
        }

        const data = await request.json();
        const { clinicId, isApproved } = data;

        const ClinicRequests = await prisma.clinic.update({
            where: { id: clinicId },
            data: { isApproved }
        })

        return NextResponse.json({ ClinicRequests }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}

export async function GET(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "unauthrized" }, { status: 401 })
        }
        const isAdmin = await authAdmin(userId);
        if (!isAdmin) {
            return NextResponse.json({ message: "not authorized" }, { status: 401 })
        }

        const ClinicRequests = await prisma.clinic.findMany({
            where: { isApproved: false }
        })
        return NextResponse.json({ ClinicRequests }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}