import { cookies } from "next/headers";
import { connectDB } from "./db";
import { verifyToken } from "./jwt";
import User from "@/models/User";

export async function getUser() {
    try {
        await connectDB();
        const cookie = await cookies();
        const token = cookie.get("token")?.value;

        if (!token) {
            return null;
        }

        const decoded = verifyToken(token);

        if (!decoded || typeof decoded === "string") {
            return null;
        }

        const user = await User.findById(decoded.userId).select("-passowrd");

        return user;

    } catch {
        return null;
    }
}