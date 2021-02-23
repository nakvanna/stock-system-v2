import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchasePaybackSchema } from './models/purchase-payback.schema';
import { PurchasePaybackResolver } from './purchase-payback.resolver';
import {PurchasePaybackService} from "./purchase-payback.service";
import {PurchaseModule} from "../purchase/purchase.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PurchasePayback', schema: PurchasePaybackSchema }]),
    forwardRef(() => PurchaseModule)
  ],
  providers: [PurchasePaybackResolver, PurchasePaybackService],
  exports: [PurchasePaybackService],
})
export class PurchasePaybackModule {}