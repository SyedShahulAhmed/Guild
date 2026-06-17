import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Community from "@/models/Community";


export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;

        const community = await Community.findOne({
            slug,
            visibility: "PUBLIC",
        });

        if (!community) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Community not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            community,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch community",
            },
            { status: 500 }
        );
    }
}