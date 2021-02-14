import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema(
  {
      business_name: { type: String, required: true },
      contact_lastname: { type: String, required: true },
      contact_firstname: { type: String, required: true },
      date_of_birth: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address1: { type: String, required: true },
      address2: { type: String },
      status: { type: Boolean, default: true },
  },
  { timestamps: true },
);
// Create index to check duplicate one or multi field.
CustomerSchema.index({ business_name: 1 }, { unique: true });
