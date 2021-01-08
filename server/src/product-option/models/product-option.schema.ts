import * as mongoose from 'mongoose';

export const ProductOptionSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    weight: { type: Number },
    weight_unit: { type: String, required: true },
    price: { type: Number, required: true },
    barcode: { type: String, unique: true },
    image_position: { type: Number, default: 0 },
    option1: { type: String },
    option2: { type: String },
    option3: { type: String },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);
// Create index to check duplicate one or multi field.
ProductOptionSchema.index({ product_id: 1, image_position: 1 }, { unique: true });
