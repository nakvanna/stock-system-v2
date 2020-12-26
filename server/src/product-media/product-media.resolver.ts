import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InputCursorPaginationOption } from 'shared/cursor-pagination';
import {
  ProductMediaCursorPagination,
  ProductMediaType,
} from './dto/product-media.dto';
import { UpdateProductMediaInput } from './input/update-product-media.input';
import { ProductMediaService } from './product-media.service';
import { CreateProductMediaInput } from './input/create-product-media.input';

@Resolver(() => ProductMediaType)
export class ProductMediaResolver {
  constructor(private readonly service: ProductMediaService) {}

  @Mutation(() => ProductMediaType)
  createProductMedia(
    @Args('create_input') create_input: CreateProductMediaInput,
  ) {
    return this.service.create(create_input);
  }

  @Query(() => ProductMediaCursorPagination, { name: 'product_medias' })
  findAll(@Args('options') options: InputCursorPaginationOption) {
    return this.service.findAll(options);
  }

  @Query(() => ProductMediaType, { name: 'product_media' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => ProductMediaType)
  updateProductMedia(
    @Args('id') id: string,
    @Args('update_input') update_input: UpdateProductMediaInput,
  ) {
    return this.service.update(id, update_input);
  }

  @Mutation(() => ProductMediaType)
  removeProductMedia(@Args('id') id: string) {
    return this.service.remove(id);
  }
}
