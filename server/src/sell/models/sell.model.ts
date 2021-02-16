import {ErrorHandlingEntity} from '../../../shared/utils';

export interface SellModel extends ErrorHandlingEntity {
    customer_id: string;
    sell_date: Date;
    sell_status: string;
    amount: number;
    paid_amount: number;
    due_amount: number;
    description: string;
    status: boolean;
}
