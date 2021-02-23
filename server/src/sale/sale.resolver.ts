import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import { SaleType, SaleCursorPagination } from './dto/sale.dto';
import { SaleService } from './sale.service';
import { CreateSaleInput } from './input/create-sale.input';
import { UpdateSaleInput } from './input/update-sale.input';

@Resolver(() => SaleType)
export class SaleResolver {
    constructor(
        private readonly service: SaleService,
    ) {
    }

    @Mutation(() => SaleType)
    async createSale(@Args('create_input') create_input: CreateSaleInput) {
        const sale = await this.service.create(create_input);
        // if (sale.success){
        //     create_input.create_sale_item_input.map(async (m: any) => {
        //         await this.inventoryService.create({
        //             ...m,//@ts-ignore
        //             purchase_id: purchase._id
        //         })
        //     })
        // }
        return sale;
    }

    @Query(() => SaleCursorPagination, {name: 'sales'})
    findAll(@Args('options') options: InputCursorPaginationOption) {
        return this.service.findAll(options);
    }

    @Query(() => SaleType, {name: 'sale'})
    findOne(@Args('id', {type: () => ID}) id: string) {
        return this.service.findOne(id);
    }

    @Mutation(() => SaleType)
    updateSale(
        @Args('id') id: string,
        @Args('update_input') update_input: UpdateSaleInput,
    ) {
        return this.service.update(id, update_input);
    }

    @Mutation(() => SaleType)
    removeSale(@Args('id') id: string) {
        return this.service.remove(id);
    }
}
