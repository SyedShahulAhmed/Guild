import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import User from "@/models/User";
import { LoginSchema } from "@/validators/login";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const res = LoginSchema.safeParse(body);
        if (!res.success) {
            return NextResponse.json({ success: false, message: "Validation Failed", errors: res.error.flatten().fieldErrors }, { status: 401 })
        }
        const { email, password } = res.data;

        const user = await User.findOne({ email: email.toLowerCase() })

        if (!user) {
            return NextResponse.json({ success: false, message: "User doesn't exist" }, { status: 401 })
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return NextResponse.json({ success: false, message: "Invalid password" }, { status: 404 })
        }

        const token = signToken({ email: user.email, userId: user._id.toString() })

        const response = NextResponse.json({
            success: true, message: "Login Sucessfull", data: {
                userId: user._id,
                email: user.email,
                token: token,
            }
        }, { status: 200 })

        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "strict",
            path: "/"
        })
        return response;

    } catch (error) {
        console.error("Login error: ", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 404 })
    }
}