import * as mongoose from 'mongoose';

export const SaleSchema = new mongoose.Schema(
    {
        customer_id: {type: String, required: true},
        sale_date: {type: Date, required: true},
        sale_status: {type: String, required: true},
        amount: {type: Number, required: true},
        paid_amount: {type: Number, required: true},
        due_amount: {type: Number, required: true},
        description: {type: String, required: true},
        status: {type: Boolean, default: true},
    },
    {timestamps: true},
);
// Create index to check duplicate one or multi field.
// PurchaseSchema.index({name: 1}, {unique: true});
