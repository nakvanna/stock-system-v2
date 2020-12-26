import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CursorPagination } from '../../../shared/cursor-pagination';
import { ErrorHandlingType } from '../../../shared/utils';

@ObjectType()
export class ProductMediaType extends PartialType(ErrorHandlingType) {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  product_id: string;
  @Field({ nullable: true })
  position: number;
  @Field({ nullable: true })
  src: string;
  @Field({ nullable: true })
  alt: string;
  @Field({ nullable: true })
  status: boolean;
}

@ObjectType()
export class ProductMediaCursorPagination extends CursorPagination(
  ProductMediaType,
) {}
