import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
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
