import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './models/product.schema';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { SubCategoryModule } from '../sub-category/sub-category.module';
import { BrandModule } from 'src/brand/brand.module';
import { ProductMediaModule } from '../product-media/product-media.module';
import { ProductOptionModule } from 'src/product-option/product-option.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    forwardRef(() => SubCategoryModule),
    forwardRef(() => BrandModule),
    forwardRef(() => ProductMediaModule),
    forwardRef(() => ProductOptionModule),
  ],
  providers: [ProductResolver, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
