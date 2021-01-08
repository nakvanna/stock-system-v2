import * as mongoose from 'mongoose';

export const InventorySchema = new mongoose.Schema(
    {
    purchase_id: {type: String, required: true},
    product_option_id: {type: String, required: true},
    purchase_status: {type: String, required: true},
    stock_qty: {type: Number, required: true},
    purchase_qty: {type: Number, required: true},
    buy_price: {type: Number, required: true},
    status: {type: Boolean, default: true},
    },
    {timestamps: true},
);
// Create index to check duplicate one or multi field.
// PurchaseSchema.index({name: 1}, {unique: true});
