import { Document } from "mongoose";
import { Role } from "../constant/enum";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: Role;
  resumeUrl?: string; // Specific to candidates
  skills?: string[]; // Specific to candidates
  avatarUrl?: string;
  headline?: string;
  bio?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}
