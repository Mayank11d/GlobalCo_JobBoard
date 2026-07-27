import { Document, Types } from "mongoose";
import { JobType, WorkMode, JobStatus } from "../constant/enum";

export interface IJob extends Document {
  title: string;
  description: string;
  requirements: string[];
  salaryMin?: number;
  salaryMax?: number;
  location?: string;
  jobType: JobType;
  workMode: WorkMode;
  status: JobStatus;
  companyId: Types.ObjectId;
  recruiterId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
