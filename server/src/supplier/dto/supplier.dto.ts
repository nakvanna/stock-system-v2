import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CursorPagination } from '../../../shared/cursor-pagination';
import { ErrorHandlingType } from '../../../shared/utils';

@ObjectType()
export class SupplierType extends PartialType(ErrorHandlingType) {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  company: string;
  @Field({ nullable: true })
  phone: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  address: string;
  @Field({ nullable: true })
  note: string;
  @Field({ nullable: true })
  status: boolean;
}

@ObjectType()
export class SupplierCursorPagination extends CursorPagination(SupplierType) {}
