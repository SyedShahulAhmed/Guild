
import { connectDB } from "@/lib/db";
import Community from "@/models/Community";

export async function getCommunityBySlug(
    slug: string
) {
    await connectDB();

    return Community.findOne({
        slug,
        visibility: "PUBLIC",
    }).lean();
}