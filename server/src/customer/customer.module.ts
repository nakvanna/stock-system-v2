import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {CustomerSchema} from "./models/customer.schema";
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import {SaleModule} from "../sale/sale.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
    forwardRef(() => SaleModule),
  ],
  providers: [CustomerResolver, CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}