import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {SaleItemSchema} from "./models/sale-item.schema";
import {SaleItemService} from "./sale-item.service";
import {SaleItemResolver} from './sale-item.resolver';
import {PurchaseModule} from "../purchase/purchase.module";
import {ProductOptionModule} from "../product-option/product-option.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'SaleItem', schema: SaleItemSchema}]),
        forwardRef(() => PurchaseModule),
        forwardRef(() => ProductOptionModule),
    ],
    providers: [SaleItemResolver, SaleItemService],
    exports: [SaleItemService],
})
export class SaleItemModule {
}