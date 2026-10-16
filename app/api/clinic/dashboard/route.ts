import authClinic from "@/middlewere/authClinic";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET() {
    
    const {userId} = await auth() ;

    if (!userId) {
        return NextResponse.json({ message: "unauthorized" }, { status: 200 })
    }

    const isClinic = await authClinic(userId) ;

    if(!isClinic){
        return NextResponse.json({message: "not authorized"}, {status: 401})
    }

    
    

}