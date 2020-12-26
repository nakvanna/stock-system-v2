import { ErrorHandlingEntity } from '../../../shared/utils';

interface OptionModel extends Document {
  name: string;
  values: string[];
}

export interface ProductModel extends ErrorHandlingEntity {
  _id: string;
  sub_category_id: string;
  brand_id: string;
  title: string;
  description: string;
  tags: string[];
  product_status: string;
  variant1: OptionModel;
  variant2: OptionModel;
  variant3: OptionModel;
  status: boolean;
}
