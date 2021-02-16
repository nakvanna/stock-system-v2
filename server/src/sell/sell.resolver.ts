import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import { SellType, SellCursorPagination } from './dto/sell.dto';
import { SellService } from './sell.service';
import { CreateSellInput } from './input/create-sell.input';
import { UpdateSellInput } from './input/update-sell.input';

@Resolver(() => SellType)
export class SellResolver {
    constructor(
        private readonly service: SellService,
    ) {
    }

    @Mutation(() => SellType)
    async createSell(@Args('create_input') create_input: CreateSellInput) {
        const sell = await this.service.create(create_input);
        // if (purchase.success){
        //     create_input.create_inventory_input.map(async (m: any) => {
        //         await this.inventoryService.create({
        //             ...m,//@ts-ignore
        //             purchase_id: purchase._id
        //         })
        //     })
        // }
        return sell;
    }

    @Query(() => SellCursorPagination, {name: 'sells'})
    findAll(@Args('options') options: InputCursorPaginationOption) {
        return this.service.findAll(options);
    }

    @Query(() => SellType, {name: 'sell'})
    findOne(@Args('id', {type: () => ID}) id: string) {
        return this.service.findOne(id);
    }

    @Mutation(() => SellType)
    updateSell(
        @Args('id') id: string,
        @Args('update_input') update_input: UpdateSellInput,
    ) {
        return this.service.update(id, update_input);
    }

    @Mutation(() => SellType)
    removeSell(@Args('id') id: string) {
        return this.service.remove(id);
    }
}
