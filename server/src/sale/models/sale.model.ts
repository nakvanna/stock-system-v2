import {ErrorHandlingEntity} from '../../../shared/utils';

export interface SaleModel extends ErrorHandlingEntity {
    customer_id: string;
    sale_date: Date;
    sale_status: string;
    amount: number;
    paid_amount: number;
    due_amount: number;
    description: string;
    status: boolean;
}
