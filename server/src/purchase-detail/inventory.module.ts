import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {InventorySchema} from "./models/inventory.schema";
import {InventoryService} from "./inventory.service";
import { InventoryResolver } from './inventory.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Inventory', schema: InventorySchema}]),
    ],
    providers: [InventoryResolver, InventoryService],
    exports: [InventoryService],
})
export class InventoryModule {
}