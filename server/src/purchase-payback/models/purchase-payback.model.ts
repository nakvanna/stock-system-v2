import { ErrorHandlingEntity } from '../../../shared/utils';
import {Field} from "@nestjs/graphql";

export interface PurchasePaybackModel extends ErrorHandlingEntity {
  purchase_id: string;
  payback: number;
  payback_date: Date;
  note: string;
  status: boolean;
}
