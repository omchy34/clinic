// middleware/authClinic.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const authClinic = async function (userId: string): Promise<string | NextResponse> {
    if (!userId) {
        return NextResponse.json({ message: "unauthrized" }, { status: 401 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { clinic: true }
        })

        if (user?.clinic) {
            if (user.clinic.isApproved === true) {
                return user.clinic.id;
            } else {
                return NextResponse.json({ message: "Your clinic is not approved yet" }, { status: 403 })
            }
        } else {
            return NextResponse.json({ message: "You don't have a clinic" }, { status: 403 })
        }
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

export default authClinic;