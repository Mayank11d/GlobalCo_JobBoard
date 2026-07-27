import { Document, Types } from "mongoose";

export interface ICompany extends Document {
  name: string;
  logoUrl?: string;
  website?: string;
  description: string;
  location?: string;
  ownerId: Types.ObjectId; // The recruiter who created the company profile
  createdAt: Date;
  updatedAt: Date;
}
