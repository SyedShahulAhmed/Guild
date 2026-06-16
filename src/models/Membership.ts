import mongoose, { Document, Schema } from "mongoose";
import { CommunityRole } from "@/constants/community-role";

export interface IMembership extends Document {
  user: mongoose.Types.ObjectId;
  community: mongoose.Types.ObjectId;
  role: CommunityRole;
}

const MembershipSchema = new Schema<IMembership>(
  {
    user : {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(CommunityRole),
      default: CommunityRole.MEMBER,
    },
  },
  {
    timestamps: true,
  }
);

MembershipSchema.index(
  {
    user: 1,
    community: 1,
  },
  {
    unique: true,
  }
);

const Membership =
  mongoose.models.Membership ||
  mongoose.model<IMembership>(
    "Membership",
    MembershipSchema
  );

export default Membership;