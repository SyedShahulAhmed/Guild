import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { SignupSchema } from "@/validators/signup";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const res = SignupSchema.safeParse(body);
        if (!res.success) {
            return NextResponse.json({ success: false, message: "Validation Failed", erros: res.error.flatten().fieldErrors }, { status: 401 })
        }
        const { username, email, password } = res.data;
        const existinguser = await User.findOne({ email: email.toLowerCase() })
        if (existinguser) {
            return NextResponse.json({ success: false, message: "User already exist" }, { status: 401 })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
        })
        return NextResponse.json({
            success: true, message: "User Created Sucessfully", data: {
                userId: user._id,
                username: user.username,
                email: user.email,
            }
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: "User Signup Failed", error }, { status: 404 })
    }
}