import { ErrorHandlingEntity } from '../../../shared/utils';

export interface ProductOptionModel extends ErrorHandlingEntity {
  product_id: string;
  sku: string;
  weight: number;
  weight_unit: string;
  price: number;
  barcode: string;
  image_position: number;
  option1: string;
  option2: string;
  option3: string;
  status: boolean;
}
