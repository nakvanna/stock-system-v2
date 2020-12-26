import * as mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema(
  { name: String, values: [String] },
  { _id: false },
);

export const ProductSchema = new mongoose.Schema(
  {
    sub_category_id: { type: String, required: true },
    brand_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    product_status: { type: String, required: true },
    status: { type: Boolean, default: true },
    //Embedded
    variant1: OptionSchema,
    variant2: OptionSchema,
    variant3: OptionSchema,
  },
  { timestamps: true },
);
// Create index to check duplicate one or multi field.
ProductSchema.index(
  { sub_category_id: 1, brand_id: 1, title: 1 },
  { unique: true },
);
