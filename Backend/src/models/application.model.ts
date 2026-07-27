import { Schema, model } from "mongoose";
import { IJobApplication } from "../interfaces/application.interface";
import { ApplicationStatus } from "../constant/enum";

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.PENDING,
      index: true,
    },
    coverLetter: { type: String },
    resumeUrl: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent a candidate from applying to the same job multiple times
JobApplicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });

export default model<IJobApplication>("JobApplication", JobApplicationSchema);
