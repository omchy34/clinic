import { prisma } from "@/lib/prisma";
import authAdmin from "@/middlewere/authAdmin";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET() {
    
    const {userId} = await auth()
    if(!userId){
        return NextResponse.json({message: "unauthorized"},{status: 401})
    }

    const isAdmin = await authAdmin(userId) ;

    if(!isAdmin){
        return NextResponse.json({message: "not authorized as admin"}, {status: 401})
    }

    const allUsers = await prisma.user.findMany({
        include: {
            clinic: true,
            bookings: true,
        }
    })

    if(!allUsers){
        return NextResponse.json({message: "cant fetch the users "}, {status: 400})
    }

    return NextResponse.json({allUsers}, {status: 200})

}