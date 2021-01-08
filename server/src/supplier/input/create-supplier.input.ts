import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSupplierInput {
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
}
