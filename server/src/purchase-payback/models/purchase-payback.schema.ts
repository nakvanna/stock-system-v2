import * as mongoose from 'mongoose';

export const PurchasePaybackSchema = new mongoose.Schema(
  {
      purchase_id: { type: String, required: true },
      payback: { type: Number, required: true },
      payback_date: { type: Date, required: true },
      note: { type: String, required: true },
      status: { type: Boolean, default: true },
  },
  { timestamps: true },
);
// Create index to check duplicate one or multi field.
// PurchasePaybackSchema.index({ name: 1 }, { unique: true });
