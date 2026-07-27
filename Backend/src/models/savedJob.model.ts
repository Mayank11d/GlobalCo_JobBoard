import { Schema, model } from "mongoose";
import { ISavedJob } from "../interfaces/savedJob.interface";

const SavedJobSchema = new Schema<ISavedJob>(
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
    },
  },
  { timestamps: true }
);

// Prevent a candidate from saving the same job twice
SavedJobSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });

export default model<ISavedJob>("SavedJob", SavedJobSchema);
