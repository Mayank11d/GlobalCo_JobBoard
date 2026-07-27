import { Document, Types } from "mongoose";

export interface ISavedJob extends Document {
  candidateId: Types.ObjectId;
  jobId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
