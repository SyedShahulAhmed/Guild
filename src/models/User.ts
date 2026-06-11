import { model, models, Schema } from "mongoose";


export type UserRole = "member" | "moderator" | "admin" | "owner" | "super_admin"

export interface IUser extends Document {
    username: string,
    email: string,
    passowrd: string,
    avatar?: string,
    bio?: string,
    role: UserRole,
    lastLogin?: Date,
}

const SocialLinksSchema = new Schema({
    github: {
        type: String,
        default: "",
    },
    linkedin: {
        type: String,
        default: "",
    },
    website: {
        type: String,
        default: "",
    },
    X: {
        type: String,
        default: "",
    },
})

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarUrl : {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
        maxlength: 300,
    },
    socialLinks: {
        type: SocialLinksSchema,
        default: {}
    },
    role: {
        type: String,
        enum: [
            "member",
            "moderator",
            "admin",
            "owner",
            "super_admin",
        ],
        default: "member"
    },
    lastLogin: Date,
},
    {
        timestamps: true,
    })

const User = models.User || model<IUser>("User", UserSchema)

export default User;

