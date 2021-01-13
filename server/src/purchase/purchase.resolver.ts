import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import {PurchaseCursorPagination, PurchaseType} from "./dto/purchase.dto";
import {PurchaseService} from './purchase.service';
import {CreatePurchaseInput} from "./input/create-purchase.input";
import {UpdatePurchaseInput} from './input/update-purchase.input';
import {InventoryService} from "../inventory/inventory.service";

@Resolver(() => PurchaseType)
export class PurchaseResolver {
    constructor(
        private readonly service: PurchaseService,
        private readonly inventoryService: InventoryService
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
}
