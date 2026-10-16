import { prisma } from "@/lib/prisma";
import authAdmin from "@/middlewere/authAdmin";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "unauthorized" }, { status: 200 })
    }

    const isAdmin = await authAdmin(userId);
    if (!isAdmin) {
        return NextResponse.json({ message: "not authorized" }, { status: 401 })
    }

    const users = await prisma.user.count() ;
    const clinic = await prisma.clinic.count() ;

    const dashboard = {
        clinic,
        users
    }

    return NextResponse.json({dashboard}) ;

}