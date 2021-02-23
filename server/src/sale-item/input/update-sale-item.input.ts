import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateSaleItemInput {
    @Field({nullable: true})
    sale_id: string;
    @Field({nullable: true})
    product_option_id: string;
    @Field({nullable: true})
    sale_status: string;
    @Field({nullable: true})
    sale_qty: number;
    @Field({nullable: true})
    sale_price: number;
    @Field({nullable: true})
    discount: number;
    @Field({nullable: true})
    tax: number;
    @Field({nullable: true})
    status: boolean;
}
