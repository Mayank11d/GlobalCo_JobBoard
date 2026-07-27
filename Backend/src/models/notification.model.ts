import { Schema, model } from "mongoose";
import { INotification } from "../interfaces/notification.interface";

const NotificationSchema = new Schema<INotification>(
  {
    recipient: { type: String, required: true, ref: 'User' },
    type: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<INotification>("Notification", NotificationSchema);
