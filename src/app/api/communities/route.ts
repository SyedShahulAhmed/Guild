import { DEFAULT_BOARDS } from "@/constants/defaultBoards";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { generateSlug } from "@/lib/slug";
import { Board } from "@/models/Board";
import Community from "@/models/Community";
import Membership from "@/models/Membership";
import { createCommunitySchema } from "@/validators/community";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();

    const data = createCommunitySchema.parse(body);

    const slug = generateSlug(data.name);

    const existing = await Community.findOne({ slug });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Community Already Exists" },
        { status: 401 },
      );
    }
    const community = await Community.create({
      ...data,
      slug,
      owner: user.id,
    });
    await Membership.create({
      user: user.id,
      community: community._id,
      role: "OWNER",
    });
    await Board.insertMany(
      DEFAULT_BOARDS.map((b) => ({
        ...b,
        communityId: community._id,
      })),
    );
    return NextResponse.json(
      {
        success: true,
        community,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 400 },
    );
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";

  const filter: Record<string, unknown> = {
    visibility: "PUBLIC",
  };

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (category && category !== "all") {
    filter.category = category;
  }

  let sortQuery = {};

  switch (sort) {
    case "oldest":
      sortQuery = { createdAt: 1 };
      break;

    case "members":
      sortQuery = { membersCount: -1 };
      break;

    case "active":
      sortQuery = { lastActivityAt: -1 };
      break;

    default:
      sortQuery = { createdAt: -1 };
  }

  const skip = (page - 1) * limit;

  const communities = await Community.find(filter)
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Community.countDocuments(filter);

  return NextResponse.json({
    communities,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}
