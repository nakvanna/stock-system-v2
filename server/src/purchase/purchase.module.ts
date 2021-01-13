import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PurchaseSchema} from './models/purchase.schema';
import {PurchaseResolver} from "./purchase.resolver";
import {PurchaseService} from './purchase.service';
import {InventoryModule} from "../inventory/inventory.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Purchase', schema: PurchaseSchema}]),
        forwardRef(() => InventoryModule),
    ],
    providers: [PurchaseResolver, PurchaseService],
    exports: [PurchaseService],
})
export class PurchaseModule {
}