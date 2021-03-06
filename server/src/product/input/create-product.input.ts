import { Field, InputType } from '@nestjs/graphql';
import {CreateProductOptionInput} from "../../product-option/input/create-product-option.input";

@InputType()
export class OptionInput {
  @Field({ nullable: true })
  name: string;
  @Field(() => [String], { nullable: true })
  values: string[];
}

@InputType()
export class CreateProductInput {
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
  @Field(() => OptionInput, { nullable: true })
  variant1: string;
  @Field(() => OptionInput, { nullable: true })
  variant2: string;
  @Field(() => OptionInput, { nullable: true })
  variant3: string;
  //Create product option
  @Field(() => [CreateProductOptionInput])
  create_product_option_input: string[];
}
