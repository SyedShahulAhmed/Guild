import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file uploaded" },
                { status: 400 }
            );
        }
        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise<{ secure_url: string }>(
            (resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: "guild/avatars"
                    },
                    (error, res) => {
                        if (error) reject(error);
                        else resolve(res as { secure_url: string });
                    }
                ).end(buffer)
            }
        )
        return NextResponse.json({
            success: true,
            avatarUrl: uploadResult.secure_url,
        });
    } catch {

        return NextResponse.json(
            { message: "Upload failed" },
            { status: 500 }
        );
    }
}