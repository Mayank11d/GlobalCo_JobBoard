import { Document, Types } from "mongoose";
import { ApplicationStatus } from "../constant/enum";

export interface IJobApplication extends Document {
  candidateId: Types.ObjectId;
  jobId: Types.ObjectId;
  status: ApplicationStatus;
  coverLetter?: string;
  resumeUrl: string; 
  createdAt: Date;
  updatedAt: Date;
}
