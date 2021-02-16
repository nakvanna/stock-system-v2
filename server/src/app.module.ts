import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ProductModule } from './product/product.module';
import { ProductOptionModule } from './product-option/product-option.module';
import { ProductMediaModule } from './product-media/product-media.module';
import {PurchaseModule} from "./purchase/purchase.module";
import {InventoryModule} from "./inventory/inventory.module";
import {SupplierModule} from "./supplier/supplier.module";
import {CustomerModule} from "./customer/customer.module";
import {SellModule} from "./sell/sell.module";

@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    MongooseModule.forRoot(
      'mongodb+srv://nakvanna:HswQ5wxCARUyZs5I@cluster0.fokwn.mongodb.net/learning-db?retryWrites=true&w=majority',
    ),
      CategoryModule,
      SubCategoryModule,
      ProductModule,
      BrandModule,
      ProductOptionModule,
      ProductMediaModule,
      PurchaseModule,
      InventoryModule,
      SupplierModule,
      CustomerModule,
      SellModule
  ],
})
export class AppModule {}
