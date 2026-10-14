// api/admin/approved-clinic
import { prisma } from "@/lib/prisma";
import authAdmin from "@/middlewere/authAdmin";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ message: "unauthorized" }, { status: 200 })
        }

        const isAdmin = await authAdmin(userId);
        if (!isAdmin) {
            return NextResponse.json({ message: "not authorized" }, { status: 401 })
        }

        const ClinicRequests = await prisma.clinic.findMany({
            where: { isApproved: true }
        })
        return NextResponse.json({ ClinicRequests }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}