import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePurchasePaybackInput {
  @Field({ nullable: true })
  purchase_id: string;
  @Field({ nullable: true })
  payback: number;
  @Field({ nullable: true })
  payback_date: Date;
  @Field({ nullable: true })
  note: string;
}
