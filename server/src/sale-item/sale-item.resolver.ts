import {Args, ID, Mutation, Query, ResolveField, Resolver, Parent} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import {SaleItemType, SaleItemCursorPagination} from './dto/sale-item.dto';
import {SaleItemService} from "./sale-item.service";
import {CreateSaleItemInput, CreateInventoriesInput} from "./input/create-sale-item.input";
import { UpdateSaleItemInput } from './input/update-sale-item.input';
import {ProductOptionType} from "../product-option/dto/product-option.dto";
import {SaleItemModel} from "./models/sale-item.model";
import {ProductOptionService} from "../product-option/product-option.service";

@Resolver(() => SaleItemType)
export class SaleItemResolver {
    constructor(
        private readonly service: SaleItemService,
        private readonly productOptionService: ProductOptionService,
        ) {
    }

    @Mutation(() => SaleItemType)
    createInventory(@Args('create_input') create_input: CreateSaleItemInput) {
        return this.service.create(create_input);
    }

    @Mutation(() => SaleItemType)
    async createInventories(@Args('create_input') create_input: CreateInventoriesInput) {
        let pre_res: any = {};
        for (const inputElement of create_input.multiple) {
            console.log(inputElement)
            pre_res = await this.service.create(inputElement);
        }
        const data: any = {}
        if (pre_res.success) {
            data.message = 'បានរក្សាទុក'
            data.success = true
            return data
        }
        data.message = 'ទិន្នន័យជាន់គ្នា'
        data.success = false
        return data
    }

    @Query(() => SaleItemCursorPagination, {name: 'sale_items'})
    findAll(@Args('options') options: InputCursorPaginationOption) {
        return this.service.findAll(options);
    }

    @Query(() => SaleItemType, {name: 'sale_item'})
    findOne(@Args('id', {type: () => ID}) id: string) {
        return this.service.findOne(id);
    }

    @Mutation(() => SaleItemType)
    updateInventory(
        @Args('id') id: string,
        @Args('update_input') update_input: UpdateSaleItemInput,
    ) {
        return this.service.update(id, update_input);
    }

    @Mutation(() => SaleItemType)
    updateInventoryPurchaseStatus(
        @Args('purchase_id') purchase_id: string,
        @Args('update_input') update_input: UpdateSaleItemInput,
    ) {
        return this.service.updatePurchaseStatus(purchase_id, update_input);
    }

    @Mutation(() => SaleItemType)
    removeInventory(@Args('id') id: string) {
        return this.service.remove(id);
    }

    @Mutation(() => SaleItemType)
    removeInventories(@Args('purchase_id') purchase_id: string) {
        console.log(purchase_id)
        return this.service.removeAll(purchase_id);
    }

    @ResolveField(() => ProductOptionType)
    product_option(@Parent() inventory: SaleItemModel){
        return this.productOptionService.findByInventory(inventory.product_option_id)
    }
}
