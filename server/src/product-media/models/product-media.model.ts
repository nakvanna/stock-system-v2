import { ErrorHandlingEntity } from '../../../shared/utils';

export interface ProductMediaModel extends ErrorHandlingEntity {
  product_id: string;
  position: number;
  src: string;
  alt: string;
  status: boolean;
}
