export interface SaleModel {
  _id?: string;
  customer_id?: string | any;
  sale_date?: Date;
  sale_status?: string;
  amount?: number;
  paid_amount?: number | any;
  due_amount?: number;
  description?: string;
  status?: boolean;
  create_sale_item_input?: [SaleItemModel] | any;

}

export interface SaleItemModel {
  _id?: string;
  sale_id?: string;
  product_option_id?: string;
  sale_status?: string;
  sale_qty?: number;
  sale_price?: number;
  discount: 0;
  tax: 0;
  status?: boolean;
}
