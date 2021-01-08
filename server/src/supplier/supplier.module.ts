import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierSchema } from "./models/supplier.schema";
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Supplier', schema: SupplierSchema }]),
  ],
  providers: [SupplierResolver, SupplierService],
  exports: [SupplierService],
})
export class SupplierModule {}