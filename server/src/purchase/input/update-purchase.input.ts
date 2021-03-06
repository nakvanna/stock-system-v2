import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdatePurchaseInput {
    @Field({nullable: true})
    supplier_id: string;
    @Field({nullable: true})
    purchase_date: Date;
    @Field({nullable: true})
    purchase_status: string;
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
