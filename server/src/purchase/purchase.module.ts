import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PurchaseSchema} from './models/purchase.schema';
import {PurchaseResolver} from "./purchase.resolver";
import {PurchaseService} from './purchase.service';
import {InventoryModule} from "../inventory/inventory.module";
import {SupplierModule} from "../supplier/supplier.module";
import {PurchasePaybackModule} from "../purchase-payback/purchase-payback.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Purchase', schema: PurchaseSchema}]),
        forwardRef(() => InventoryModule),
        forwardRef(() => SupplierModule),
        forwardRef(() => PurchasePaybackModule),
    ],
    providers: [PurchaseResolver, PurchaseService],
    exports: [PurchaseService],
})
export class PurchaseModule {
}