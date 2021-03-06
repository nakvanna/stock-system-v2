import {Field, ID, ObjectType, PartialType} from '@nestjs/graphql';
import {CursorPagination} from '../../../shared/cursor-pagination';
import {ErrorHandlingType} from '../../../shared/utils';
import {ProductOptionType} from "../../product-option/dto/product-option.dto";

@ObjectType()
export class InventoryType extends PartialType(ErrorHandlingType) {
    @Field(() => ID, {nullable: true})
    _id: string;
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
    buy_price: number;
    @Field({nullable: true})
    discount: number;
    @Field({nullable: true})
    tax: number;
    @Field({nullable: true})
    status: boolean;
    @Field(() => ProductOptionType)
    product_option: string;
}

@ObjectType()
export class InventoryCursorPagination extends CursorPagination(InventoryType) {
}
