import { ErrorHandlingEntity } from '../../../shared/utils';

export interface CustomerModel extends ErrorHandlingEntity {
  customer_name: string;
  contact_lastname: string;
  contact_firstname: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  status: boolean;
}
