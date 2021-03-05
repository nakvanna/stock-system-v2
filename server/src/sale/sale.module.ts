import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { SaleResolver } from './sale.resolver';
import { SaleService } from './sale.service';
import { SaleSchema } from './models/sale.schema';
import {SaleItemModule} from "../sale-item/sale-item.module";
import {CustomerModule} from "../customer/customer.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Sale', schema: SaleSchema}]),
        forwardRef(() => SaleItemModule),
        forwardRef(() => CustomerModule),
    ],
    providers: [SaleResolver, SaleService],
    exports: [SaleService],
})
export class SaleModule {
}