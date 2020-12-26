import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductMediaInput {
  @Field({ nullable: true })
  product_id: string;
  @Field({ nullable: true })
  position: number;
  @Field({ nullable: true })
  src: string;
  @Field({ nullable: true })
  alt: string;
}
