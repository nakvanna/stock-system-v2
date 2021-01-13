import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {InventorySchema} from "./models/inventory.schema";
import {InventoryService} from "./inventory.service";
import { InventoryResolver } from './inventory.resolver';
import {PurchaseModule} from "../purchase/purchase.module";
import {ProductOptionModule} from "../product-option/product-option.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Inventory', schema: InventorySchema}]),
        forwardRef(() => PurchaseModule),
        forwardRef(() => ProductOptionModule),
    ],
    providers: [InventoryResolver, InventoryService],
    exports: [InventoryService],
})
export class InventoryModule {
}