import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import User from "@/models/User";
import { ProfileSchema } from "@/validators/profile";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        connectDB();
        const user = await getUser();
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized", }, { status: 401 })
        }
        const profile = await User.findOne({
            email: user.email,
        }).select("username email bio avatarUrl socialLinks")

        return NextResponse.json({ success: true, profile }, { status: 200 })
    } catch {
        return NextResponse.json({ success: false, message: "Internal server Error", }, { status: 400 })
    }
}


export async function PATCH(req: NextRequest) {
    try {
        await connectDB();

        const user = await getUser();
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized", }, { status: 401 })
        }
        const body = await req.json();

        const validated = ProfileSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json({ success: false, message: "Validation Failed", errors: validated.error.flatten() }, { status: 401 })
        }

        const updatedUser = await User.findOneAndUpdate({
            email: user.email,
        },
            {
                bio: body.bio,
                avatarUrl: body.avatarUrl,
                socialLinks: body.socialLinks,
            }, {
            new: true,
        })

        return NextResponse.json({ success: true, message: "User Updated Successfully", updatedUser }, { status: 200 })
    } catch {
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 400 })

    }
}