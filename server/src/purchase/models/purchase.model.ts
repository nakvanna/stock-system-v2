import {ErrorHandlingEntity} from '../../../shared/utils';

export interface PurchaseModel extends ErrorHandlingEntity {
    supplier_id: string;
    purchase_date: Date;
    purchase_status: string;
    amount: number;
    paid_amount: number;
    due_amount: number;
    description: string;
    status: boolean;
}
