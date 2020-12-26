import { Field, InputType } from '@nestjs/graphql';
import {OptionInput} from "./create-product.input";

@InputType()
export class UpdateProductInput {
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
  variant1: any;
  @Field(() => OptionInput, { nullable: true })
  variant2: any;
  @Field(() => OptionInput, { nullable: true })
  variant3: any;
  @Field({ nullable: true })
  status: boolean;
}
