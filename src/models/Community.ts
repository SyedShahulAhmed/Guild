import mongoose, { Schema, Document } from "mongoose";

export interface ICommunity extends Document {
    name: string;
    slug: string;
    description?: string;
    banner?: string;
    logo?: string;
    category?: string;
    visibility: "PUBLIC" | "PRIVATE";
    owner: mongoose.Types.ObjectId;
    memberCount: number;
}

const CommunitySchema = new Schema<ICommunity>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 100,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },

        description: {
            type: String,
            maxLength: 500,
        },

        banner: String,

        logo: String,

        category: {
            type: String,
            required: true,
        },
        visibility: {
            type: String,
            enum: ["PUBLIC", "PRIVATE"],
            default: "PUBLIC",
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        memberCount: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Community ||
    mongoose.model<ICommunity>(
        "Community",
        CommunitySchema
    );