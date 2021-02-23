import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateSaleInput {
    @Field({nullable: true})
    customer_id: string;
    @Field({nullable: true})
    sale_date: Date;
    @Field({nullable: true})
    sale_status: string;
    @Field({nullable: true})
    amount: number;
    @Field({nullable: true})
    paid_amount: number;
    @Field({nullable: true})
    due_amount: number;
    @Field({nullable: true})
    description: string;
}
