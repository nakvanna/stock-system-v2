import {ErrorHandlingEntity} from '../../../shared/utils';

export interface SaleItemModel extends ErrorHandlingEntity {
    sale_id: string;
    product_option_id: string;
    sale_status: string;
    sale_qty: number;
    sale_price: number;
    discount: number;
    tax: number;
    status: boolean;
}
