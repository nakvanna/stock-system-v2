export interface PurchaseModel {
  _id?: string;
  supplier_id?: string | any;
  purchase_date?: Date;
  purchase_status?: string;
  amount?: number;
  paid_amount?: number;
  due_amount?: number;
  description?: string;
  status?: boolean;
  create_inventory_input?: [InventoryModel] | any;

}

export interface InventoryModel {
  _id?: string;
  purchase_id?: string;
  product_option_id?: string;
  purchase_status?: string;
  stock_qty?: number;
  purchase_qty?: number;
  buy_price?: number;
  status?: boolean;
}
