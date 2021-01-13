import {ProductOptionModel} from "pages/setting/product/view/model/product-option.model";

export interface ProductModel {
  _id?: string;
  sub_category_id?: string | any;
  brand_id?: string | any;
  title: string;
  description: string;
  tags: string[];
  product_status: string;
  variant1: OptionModel;
  variant2: OptionModel;
  variant3: OptionModel;
  status?: boolean;
  create_product_option_input: [ProductOptionModel] | any;
  //Just To Store before map
  pre_variants?: [OptionModel] | any;
  default_sku?: string;
  default_price?: number;
  default_barcode?: string;
}

export interface OptionModel {
  name?: string;
  values?: string[] | any;
}
