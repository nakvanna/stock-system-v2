import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CursorPagination } from '../../../shared/cursor-pagination';
import { ErrorHandlingType } from '../../../shared/utils';

@ObjectType()
export class CustomerType extends PartialType(ErrorHandlingType) {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  customer_name: string;
  @Field({ nullable: true })
  contact_lastname: string;
  @Field({ nullable: true })
  contact_firstname: string;
  @Field({ nullable: true })
  phone: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  address1: string;
  @Field({ nullable: true })
  address2: string;
  @Field({ nullable: true })
  status: boolean;
}

@ObjectType()
export class CustomerCursorPagination extends CursorPagination(CustomerType) {}
