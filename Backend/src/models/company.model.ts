import { Schema, model } from "mongoose";
import { ICompany } from "../interfaces/company.interface";

const CompanySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    logoUrl: { type: String },
    website: { type: String, trim: true },
    description: { type: String, required: true },
    location: { type: String, trim: true },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default model<ICompany>("Company", CompanySchema);
