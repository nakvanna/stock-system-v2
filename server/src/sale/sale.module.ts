import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { SaleResolver } from './sale.resolver';
import { SaleService } from './sale.service';
import { SaleSchema } from './models/sale.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Sale', schema: SaleSchema}]),
        // forwardRef(() => SupplierModule),
    ],
    providers: [SaleResolver, SaleService],
    exports: [SaleService],
})
export class SaleModule {
}