import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InputCursorPaginationOption } from 'shared/cursor-pagination';
import {SupplierCursorPagination, SupplierType} from './dto/supplier.dto';
import {UpdateSupplierInput} from "./input/update-supplier.input";
import { CreateSupplierInput } from './input/create-supplier.input';
import {SupplierService} from "./supplier.service";

@Resolver(() => SupplierType)
export class SupplierResolver {
  constructor(private readonly service: SupplierService) {}

  @Mutation(() => SupplierType)
  createSupplier(@Args('create_input') create_input: CreateSupplierInput) {
    console.log(create_input);
    return this.service.create(create_input);
  }

  @Query(() => SupplierCursorPagination, { name: 'suppliers' })
  findAll(@Args('options') options: InputCursorPaginationOption) {
    return this.service.findAll(options);
  }

  @Query(() => SupplierType, { name: 'supplier' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => SupplierType)
  updateSupplier(
    @Args('id') id: string,
    @Args('update_input') update_input: UpdateSupplierInput,
  ) {
    return this.service.update(id, update_input);
  }

  @Mutation(() => SupplierType)
  removeSupplier(@Args('id') id: string) {
    return this.service.remove(id);
  }
}
