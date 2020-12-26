import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductOptionInput {
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
}
