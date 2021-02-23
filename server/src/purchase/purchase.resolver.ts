import {Args, ID, Mutation, Query, ResolveField, Resolver, Parent} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import {PurchaseCursorPagination, PurchaseType} from "./dto/purchase.dto";
import {PurchaseService} from './purchase.service';
import {CreatePurchaseInput} from "./input/create-purchase.input";
import {UpdatePurchaseInput} from './input/update-purchase.input';
import {InventoryService} from "../inventory/inventory.service";
import {SupplierType} from "../supplier/dto/supplier.dto";
import {PurchaseModel} from "./models/purchase.model";
import {SupplierService} from "../supplier/supplier.service";
import {InventoryType} from "../inventory/dto/inventory.dto";
import {PurchasePaybackType} from "../purchase-payback/dto/purchase-payback.dto";
import {PurchasePaybackService} from "../purchase-payback/purchase-payback.service";

@Resolver(() => PurchaseType)
export class PurchaseResolver {
    constructor(
        private readonly service: PurchaseService,
        private readonly inventoryService: InventoryService,
        private readonly supplierService: SupplierService,
        private readonly purchasePaybackService: PurchasePaybackService,
    ) {
    }

    @Mutation(() => PurchaseType)
    async createPurchase(@Args('create_input') create_input: CreatePurchaseInput) {
        const purchase = await this.service.create(create_input);
        if (purchase.success){
            create_input.create_inventory_input.map(async (m: any) => {
                await this.inventoryService.create({
                    ...m,//@ts-ignore
                    purchase_id: purchase._id
                })
            })
        }
        return purchase;
    }

    @Query(() => PurchaseCursorPagination, {name: 'purchases'})
    findAll(@Args('options') options: InputCursorPaginationOption) {
        return this.service.findAll(options);
    }

    @Query(() => PurchaseType, {name: 'purchase'})
    findOne(@Args('id', {type: () => ID}) id: string) {
        return this.service.findOne(id);
    }

    @Mutation(() => PurchaseType)
    updatePurchase(
        @Args('id') id: string,
        @Args('update_input') update_input: UpdatePurchaseInput,
    ) {
        return this.service.update(id, update_input);
    }

    @Mutation(() => PurchaseType)
    removePurchase(@Args('id') id: string) {
        return this.service.remove(id);
    }

    @ResolveField(() => SupplierType)
    supplier(@Parent() purchase: PurchaseModel){
        return this.supplierService.findByPurchase(purchase.supplier_id)
    }
    @ResolveField(() => InventoryType)
    inventory(@Parent() purchase: PurchaseModel){
        return this.inventoryService.findByPurchase(purchase._id)
    }
    @ResolveField(() => PurchasePaybackType)
    purchase_payback(@Parent() purchase: PurchaseModel){
        return this.purchasePaybackService.findByPurchase(purchase._id)
    }
}
