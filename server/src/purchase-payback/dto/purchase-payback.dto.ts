import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CursorPagination } from '../../../shared/cursor-pagination';
import { ErrorHandlingType } from '../../../shared/utils';

@ObjectType()
export class PurchasePaybackType extends PartialType(ErrorHandlingType) {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  purchase_id: string;
  @Field({ nullable: true })
  payback: number;
  @Field({ nullable: true })
  payback_date: Date;
  @Field({ nullable: true })
  note: string;
  @Field({ nullable: true })
  status: boolean;
}

@ObjectType()
export class PurchasePaybackCursorPagination extends CursorPagination(PurchasePaybackType) {}
