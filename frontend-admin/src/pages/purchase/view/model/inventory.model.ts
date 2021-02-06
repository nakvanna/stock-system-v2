export interface InventoryModel {
  _id?: string;
  purchase_id: string;
  product_option_id: string;
  purchase_status: string;
  stock_qty: number;
  purchase_qty: number;
  buy_price: number;
  discount: number;
  tax: number;
  status: boolean;

}
