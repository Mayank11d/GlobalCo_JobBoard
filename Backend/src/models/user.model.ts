import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { Role } from "../constant/enum";

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false }, // Hidden by default
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.CANDIDATE,
    },
    // Candidate-specific fields (optional for recruiters)
    resumeUrl: { type: String },
    skills: [{ type: String, trim: true }],
    avatarUrl: { type: String },
    headline: { type: String, trim: true },
    bio: { type: String, trim: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
