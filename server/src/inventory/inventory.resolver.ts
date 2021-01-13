import {Args, ID, Mutation, Query, ResolveField, Resolver, Parent} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import { InventoryType, InventoryCursorPagination } from './dto/inventory.dto';
import {InventoryService} from "./inventory.service";
import {CreateInventoryInput} from "./input/create-inventory.input";
import { UpdateInventoryInput } from './input/update-inventory.input';
import {ProductOptionType} from "../product-option/dto/product-option.dto";
import {InventoryModel} from "./models/inventory.model";
import {ProductOptionService} from "../product-option/product-option.service";

@Resolver(() => InventoryType)
export class InventoryResolver {
    constructor(
        private readonly service: InventoryService,
        private readonly productOptionService: ProductOptionService,
        ) {
    }

    @Mutation(() => InventoryType)
    createInventory(@Args('create_input') create_input: CreateInventoryInput) {
        return this.service.create(create_input);
    }

    @Query(() => InventoryCursorPagination, {name: 'inventories'})
    findAll(@Args('options') options: InputCursorPaginationOption) {
        return this.service.findAll(options);
    }

    @Query(() => InventoryType, {name: 'inventory'})
    findOne(@Args('id', {type: () => ID}) id: string) {
        return this.service.findOne(id);
    }

    @Mutation(() => InventoryType)
    updateInventory(
        @Args('id') id: string,
        @Args('update_input') update_input: UpdateInventoryInput,
    ) {
        return this.service.update(id, update_input);
    }

    @Mutation(() => InventoryType)
    removeInventory(@Args('id') id: string) {
        return this.service.remove(id);
    }

    @ResolveField(() => ProductOptionType)
    product_option(@Parent() inventory: InventoryModel){
        return this.productOptionService.findByInventory(inventory.product_option_id)
    }
}
