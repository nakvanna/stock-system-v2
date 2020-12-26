import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CursorPagination } from '../../../shared/cursor-pagination';
import { ErrorHandlingType } from '../../../shared/utils';
import { SubCategoryType } from '../../sub-category/dto/sub-category.dto';
import { BrandType } from '../../brand/dto/brand.dto';
import {ProductMediaType} from "../../product-media/dto/product-media.dto";
import {ProductOptionType} from "../../product-option/dto/product-option.dto";

@ObjectType()
class OptionType {
  @Field({ nullable: true })
  name: string;
  @Field(() => [String], { nullable: true })
  values: string[];
}

@ObjectType()
export class ProductType extends PartialType(ErrorHandlingType) {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  sub_category_id: string;
  @Field({ nullable: true })
  brand_id: string;
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field(() => [String], { nullable: true })
  tags: string[];
  @Field({ nullable: true })
  product_status: string;
  @Field({ nullable: true })
  status: boolean;
  @Field(() => OptionType, { nullable: true })
  variant1: string;
  @Field(() => OptionType, { nullable: true })
  variant2: string;
  @Field(() => OptionType, { nullable: true })
  variant3: string;
  @Field(() => SubCategoryType)
  sub_category: string;
  @Field(() => BrandType)
  brand: string;
  @Field(() => [ProductMediaType])
  product_media: string[];
  @Field(() => [ProductOptionType])
  product_option: string[];
}

@ObjectType()
export class ProductCursorPagination extends CursorPagination(ProductType) {}
