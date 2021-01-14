import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierSchema } from "./models/supplier.schema";
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';
import {PurchaseModule} from "../purchase/purchase.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Supplier', schema: SupplierSchema }]),
      forwardRef(() => PurchaseModule)
  ],
  providers: [SupplierResolver, SupplierService],
  exports: [SupplierService],
})
export class SupplierModule {}