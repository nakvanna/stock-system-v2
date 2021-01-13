import {Field, InputType} from '@nestjs/graphql';
import {CreateInventoryInput} from "../../inventory/input/create-inventory.input";

@InputType()
export class CreatePurchaseInput {
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
    @Field(() => [CreateInventoryInput])
    create_inventory_input: string[]
}
