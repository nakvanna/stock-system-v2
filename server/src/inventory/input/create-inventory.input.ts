import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateInventoryInput {
    @Field({nullable: true})
    purchase_id: string;
    @Field({nullable: true})
    product_option_id: string;
    @Field({nullable: true})
    purchase_status: string;
    @Field({nullable: true})
    stock_qty: number;
    @Field({nullable: true})
    purchase_qty: number;
    @Field({nullable: true})
    discount: number;
    @Field({nullable: true})
    tax: number;
    @Field({nullable: true})
    buy_price: number;
}

@InputType()
export class CreateInventoriesInput {
    @Field(() => [CreateInventoryInput])
    multiple?: any;
}
