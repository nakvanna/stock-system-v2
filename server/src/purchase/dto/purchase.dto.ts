import {Field, ID, ObjectType, PartialType} from '@nestjs/graphql';
import {CursorPagination} from '../../../shared/cursor-pagination';
import {ErrorHandlingType} from '../../../shared/utils';
import {SupplierType} from "../../supplier/dto/supplier.dto";
import {InventoryType} from "../../inventory/dto/inventory.dto";

@ObjectType()
export class PurchaseType extends PartialType(ErrorHandlingType) {
    @Field(() => ID, {nullable: true})
    _id: string;
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
    @Field(() => SupplierType)
    supplier: string;
    @Field(() => [InventoryType])
    inventory: string[];
}

@ObjectType()
export class PurchaseCursorPagination extends CursorPagination(PurchaseType) {
}
