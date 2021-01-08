import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import { InventoryType, InventoryCursorPagination } from './dto/inventory.dto';
import {InventoryService} from "./inventory.service";
import {CreateInventoryInput} from "./input/create-inventory.input";
import { UpdateInventoryInput } from './input/update-inventory.input';

@Resolver(() => InventoryType)
export class InventoryResolver {
    constructor(private readonly service: InventoryService) {
    }

    @Mutation(() => InventoryType)
    createInventory(@Args('create_input') create_input: CreateInventoryInput) {
        console.log(create_input)
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
}
