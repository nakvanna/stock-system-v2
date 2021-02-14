import { ErrorHandlingEntity } from '../../../shared/utils';

export interface CustomerModel extends ErrorHandlingEntity {
  business_name: string;
  contact_lastname: string;
  contact_firstname: string;
  date_of_birth: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  status: boolean;
}
