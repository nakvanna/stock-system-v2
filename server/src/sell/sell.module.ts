import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {InventoryModule} from "../inventory/inventory.module";
import {SupplierModule} from "../supplier/supplier.module";
import { SellResolver } from './sell.resolver';
import { SellService } from './sell.service';
import { SellSchema } from './models/sell.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Sell', schema: SellSchema}]),
        forwardRef(() => InventoryModule),
        forwardRef(() => SupplierModule),
    ],
    providers: [SellResolver, SellService],
    exports: [SellService],
})
export class SellModule {
}