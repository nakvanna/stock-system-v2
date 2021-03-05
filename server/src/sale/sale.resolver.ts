import {Args, ID, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {InputCursorPaginationOption} from 'shared/cursor-pagination';
import { SaleType, SaleCursorPagination } from './dto/sale.dto';
import { SaleService } from './sale.service';
import { CreateSaleInput } from './input/create-sale.input';
import { UpdateSaleInput } from './input/update-sale.input';
import {SaleItemService} from "../sale-item/sale-item.service";
import {CustomerType} from "../customer/dto/customer.dto";
import {SaleModel} from "./models/sale.model";
import {CustomerService} from "../customer/customer.service";
import {SaleItemType} from "../sale-item/dto/sale-item.dto";

@Resolver(() => SaleType)
export class SaleResolver {
    constructor(
        private readonly service: SaleService,
        private readonly saleItemService: SaleItemService,
        private readonly customerService: CustomerService
    ) {
    }

    @Mutation(() => SaleType)
    async createSale(@Args('create_input') create_input: CreateSaleInput) {
        const sale = await this.service.create(create_input);
        if (sale.success){
            create_input.create_sale_item_input.map(async (m: any) => {
                await this.saleItemService.create({
                    ...m,//@ts-ignore
                    sale_id: sale._id
                })
            })
        }
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

    @ResolveField(() => CustomerType)
    customer(@Parent() sale: SaleModel){
        return this.customerService.findBySale(sale.customer_id)
    }

    @ResolveField(() => [SaleItemType])
    sale_item(@Parent() sale: SaleModel){
        return this.saleItemService.findBySale(sale._id)
    }
}
