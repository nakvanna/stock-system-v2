import * as mongoose from 'mongoose';

export const SaleItemSchema = new mongoose.Schema(
    {
    sale_id: {type: String, required: true},
    product_option_id: {type: String, required: true},
    sale_status: {type: String, required: true},
    sale_qty: {type: Number, required: true},
    buy_price: {type: Number, required: true},
    discount: {type: Number, required: true},
    tax: {type: Number, required: true},
    status: {type: Boolean, default: true},
    },
    {timestamps: true},
);
// Create index to check duplicate one or multi field.
// PurchaseSchema.index({name: 1}, {unique: true});
