import * as mongoose from 'mongoose';

export const SupplierSchema = new mongoose.Schema(
  {
      name: { type: String, default: true },
      company: { type: String, default: true },
      phone: { type: String, default: true },
      email: { type: String, default: true },
      address: { type: String, default: true },
      note: { type: String, default: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);
// Create index to check duplicate one or multi field.
SupplierSchema.index({ company: 1, name: 1 }, { unique: true });
