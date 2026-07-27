import { Schema, model } from "mongoose";
import { IJob } from "../interfaces/job.interface";
import { JobType, WorkMode, JobStatus } from "../constant/enum";

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    requirements: [{ type: String, required: true }],
    salaryMin: { type: Number },
    salaryMax: { type: Number },
    location: { type: String, trim: true },
    jobType: { type: String, enum: Object.values(JobType), required: true },
    workMode: { type: String, enum: Object.values(WorkMode), required: true },
    status: { type: String, enum: Object.values(JobStatus), default: JobStatus.DRAFT, index: true },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Compound index for advanced filtering
JobSchema.index({ status: 1, title: 'text' });

export default model<IJob>("Job", JobSchema);
