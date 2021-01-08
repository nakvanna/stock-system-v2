import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PurchaseSchema} from './models/purchase.schema';
import {PurchaseResolver} from "./purchase.resolver";
import {PurchaseService} from './purchase.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Purchase', schema: PurchaseSchema}]),
    ],
    providers: [PurchaseResolver, PurchaseService],
    exports: [PurchaseService],
})
export class PurchaseModule {
}