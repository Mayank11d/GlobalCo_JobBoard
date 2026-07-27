import { Document } from "mongoose";

export interface INotification extends Document {
  recipient: string;
  type: string; // 'APPLICATION_VIEWED', 'JOB_MATCH', etc.
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
