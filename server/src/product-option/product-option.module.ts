import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../product/product.module';
import { ProductOptionResolver } from './product-option.resolver';
import { ProductOptionService } from './product-option.service';
import { ProductOptionSchema } from './models/product-option.schema';
import {InventoryModule} from "../inventory/inventory.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductOption', schema: ProductOptionSchema },
    ]),
    forwardRef(() => ProductModule),
    forwardRef(() => InventoryModule),
  ],
  providers: [ProductOptionResolver, ProductOptionService],
  exports: [ProductOptionService],
})
export class ProductOptionModule {}
