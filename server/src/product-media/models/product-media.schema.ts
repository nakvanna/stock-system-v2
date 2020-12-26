import * as mongoose from 'mongoose';

export const ProductMediaSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true },
    position: { type: Number, required: true },
    src: { type: String, required: true },
    alt: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);
// Create index to check duplicate one or multi field.
// ProductMediaSchema.index({ name: 1 }, { unique: true });
