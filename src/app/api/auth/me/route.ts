import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB();
        const user = await getUser();

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 401 })
        }

        return NextResponse.json({ success: true, message: "User fetched", user }, { status: 200 })

    } catch {
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 400 })
    }
}

