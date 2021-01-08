import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CursorPagination } from '../../../shared/cursor-pagination';
import { ErrorHandlingType } from '../../../shared/utils';
import {ProductType} from "../../product/dto/product.dto";

@ObjectType()
export class ProductOptionType extends PartialType(ErrorHandlingType) {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  product_id: string;
  @Field({ nullable: true })
  sku: string;
  @Field({ nullable: true })
  weight: number;
  @Field({ nullable: true })
  weight_unit: string;
  @Field({ nullable: true })
  price: number;
  @Field({ nullable: true })
  barcode: string;
  @Field({ nullable: true })
  image_position: number;
  @Field({ nullable: true })
  option1: string;
  @Field({ nullable: true })
  option2: string;
  @Field({ nullable: true })
  option3: string;
  @Field({ nullable: true })
  status: boolean;
  @Field(() => ProductType)
  product: string;
}

@ObjectType()
export class ProductOptionCursorPagination extends CursorPagination(ProductOptionType) {}
