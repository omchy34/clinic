import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma";

async function POST(request: Request) {

    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ message: "unauthrized", status: 401 })
    }

    const formData = await request.formData();

    const phone =  formData.get("phone") as string ;
    const name = formData.get("name") as string ;
    const address = formData.get("address") as string ;
    const city  = formData.get("city") as string ;
    const email = formData.get("email") as string ;
    const logo = formData.get("logo") as File ;
    const clinicImage = formData.get("clinicImage") as File ;

    if(!name || !address || !phone || !city || !email || !clinicImage || !logo){
        return NextResponse.json({message: "all fields are required", status: 401})
    }

    const clinic = await prisma.clinic.findFirst({
        where: {userId: userId},
    })

    if (clinic) return NextResponse.json({status: clinic.isApproved})

    const buffer = Buffer.from(await logo.arrayBuffer()) ;

    const response = await imagekit.upload({
            file: buffer,
            fileName: image.name,
            folder: "CartLogos",
        })

        const optimizedImage = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto" },
                { format: "webp" },
                { width: "512" }
            ]
        })
}