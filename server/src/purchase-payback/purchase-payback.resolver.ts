import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InputCursorPaginationOption } from 'shared/cursor-pagination';
import { PurchasePaybackType, PurchasePaybackCursorPagination } from './dto/purchase-payback.dto';
import {PurchasePaybackService} from "./purchase-payback.service";
import { CreatePurchasePaybackInput } from './input/create-purchase-payback.input';
import { UpdatePurchasePaybackInput } from './input/update-purchase-payback.input';

@Resolver(() => PurchasePaybackType)
export class PurchasePaybackResolver {
  constructor(private readonly service: PurchasePaybackService) {}

  @Mutation(() => PurchasePaybackType)
  createPurchasePayback(@Args('create_input') create_input: CreatePurchasePaybackInput) {
    console.log(create_input);
    return this.service.create(create_input);
  }

  @Query(() => PurchasePaybackCursorPagination, { name: 'purchase_paybacks' })
  findAll(@Args('options') options: InputCursorPaginationOption) {
    return this.service.findAll(options);
  }

  @Query(() => PurchasePaybackType, { name: 'purchase_payback' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => PurchasePaybackType)
  updatePurchasePayback(
    @Args('id') id: string,
    @Args('update_input') update_input: UpdatePurchasePaybackInput,
  ) {
    return this.service.update(id, update_input);
  }

  @Mutation(() => PurchasePaybackType)
  removePurchasePayback(@Args('id') id: string) {
    return this.service.remove(id);
  }
}
