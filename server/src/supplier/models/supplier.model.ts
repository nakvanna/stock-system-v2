import { ErrorHandlingEntity } from '../../../shared/utils';

export interface SupplierModel extends ErrorHandlingEntity {
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  status: boolean;
}
