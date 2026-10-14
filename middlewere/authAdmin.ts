import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


async function authAdmin(userId: string): Promise<boolean | NextResponse> {
    try {
        if (!userId) {
            return NextResponse.json({ message: "unauthrized" }, { status: 401 })
        }

        const client = await clerkClient();
        const user = await client.users.getUser(userId);

        const email = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress;

        if (!email) {
            return false;
        }

        const adminEmails = process.env.ADMIN_EMAILS?.split(",") ?? "".split(",").map(email => email.trim().toLocaleLowerCase() );

        return adminEmails.includes(email.toLocaleLowerCase());
    } catch (error: any) {
        console.error("Error in authAdmin:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

}

export default authAdmin;