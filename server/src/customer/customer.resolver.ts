import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InputCursorPaginationOption } from 'shared/cursor-pagination';
import {CustomerType, CustomerCursorPagination} from "./dto/customer.dto";
import { CustomerService } from './customer.service';
import {CreateCustomerInput} from "./input/create-customer.input";
import {UpdateCustomerInput} from "./input/update-customer.input";

@Resolver(() => CustomerType)
export class CustomerResolver {
  constructor(private readonly service: CustomerService) {}

  @Mutation(() => CustomerType)
  createCustomer(@Args('create_input') create_input: CreateCustomerInput) {
    return this.service.create(create_input);
  }

  @Query(() => CustomerCursorPagination, { name: 'customers' })
  findAll(@Args('options') options: InputCursorPaginationOption) {
    return this.service.findAll(options);
  }

  @Query(() => CustomerType, { name: 'customer' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => CustomerType)
  updateCustomer(
    @Args('id') id: string,
    @Args('update_input') update_input: UpdateCustomerInput,
  ) {
    return this.service.update(id, update_input);
  }

  @Mutation(() => CustomerType)
  removeCustomer(@Args('id') id: string) {
    return this.service.remove(id);
  }
}
