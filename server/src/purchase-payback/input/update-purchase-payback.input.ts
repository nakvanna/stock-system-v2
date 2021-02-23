import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePurchasePaybackInput {
  @Field({ nullable: true })
  purchase_id: string;
  @Field({ nullable: true })
  payback: number;
  @Field({ nullable: true })
  payback_date: Date;
  @Field({ nullable: true })
  note: string;
  @Field({ nullable: true })
  status: boolean;
}
