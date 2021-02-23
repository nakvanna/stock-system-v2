export interface PurchasePaybackModel {
  _id?: string;
  purchase_id?: string;
  payback?: number;
  payback_date?: Date;
  note?: string;
  status?: boolean;
}
