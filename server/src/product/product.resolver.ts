import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InputCursorPaginationOption } from 'shared/cursor-pagination';
import { ProductCursorPagination, ProductType } from './dto/product.dto';
import { CreateProductInput } from './input/create-product.input';
import { ProductService } from './product.service';
import { UpdateProductInput } from './input/update-product.input';
import { ProductModel } from './models/product.model';
import { SubCategoryType } from 'src/sub-category/dto/sub-category.dto';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { BrandType } from '../brand/dto/brand.dto';
import { BrandService } from '../brand/brand.service';
import {ProductMediaService} from "../product-media/product-media.service";
import {ProductMediaType} from "../product-media/dto/product-media.dto";
import {ProductOptionType} from "../product-option/dto/product-option.dto";
import {ProductOptionService} from "../product-option/product-option.service";

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(
    private readonly service: ProductService,
    private readonly subCategoryService: SubCategoryService,
    private readonly brandService: BrandService,
    private readonly productMediaService: ProductMediaService,
    private readonly productOptionService: ProductOptionService,
  ) {}

  @Mutation(() => ProductType)
  async createProduct(@Args('create_input') create_input: CreateProductInput) {
    const product = await this.service.create(create_input);
    if (product.success){
      create_input.create_product_option_input.map(async (m: any)=> {
        await this.productOptionService.create({
          ...m,//@ts-ignore
          product_id: product._id
        })
      })
    }
    return product;
  }

  @Query(() => ProductCursorPagination, { name: 'products' })
  findAll(@Args('options') options: InputCursorPaginationOption) {
    return this.service.findAll(options);
  }

  @Query(() => ProductType, { name: 'product' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @Args('id') id: string,
    @Args('update_input') update_input: UpdateProductInput,
  ) {
    return this.service.update(id, update_input);
  }

  @Mutation(() => ProductType)
  removeProduct(@Args('id') id: string) {
    return this.service.remove(id);
  }

  @ResolveField(() => SubCategoryType)
  sub_category(@Parent() product: ProductModel) {
    return this.subCategoryService.findByProduct(product.sub_category_id);
  }

  @ResolveField(() => BrandType)
  brand(@Parent() product: ProductModel) {
    return this.brandService.findByParent(product.brand_id);
  }

  @ResolveField(() => [ProductMediaType])
  product_media(@Parent() product: ProductModel) {
    return this.productMediaService.findByProduct(product._id);
  }
  @ResolveField(() => [ProductOptionType])
  product_option(@Parent() product: ProductModel) {
    return this.productOptionService.findByProduct(product._id);
  }
}
