import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateSellInput {
    @Field({nullable: true})
    customer_id: string;
    @Field({nullable: true})
    sell_date: Date;
    @Field({nullable: true})
    sell_status: string;
    @Field({nullable: true})
    amount: number;
    @Field({nullable: true})
    paid_amount: number;
    @Field({nullable: true})
    due_amount: number;
    @Field({nullable: true})
    description: string;
    @Field({nullable: true})
    status: boolean;
}
