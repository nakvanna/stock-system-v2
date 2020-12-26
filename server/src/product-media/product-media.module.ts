import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../product/product.module';
import { ProductMediaSchema } from './models/product-media.schema';
import { ProductMediaService } from './product-media.service';
import { ProductMediaResolver } from './product-media.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductMedia', schema: ProductMediaSchema },
    ]),
    forwardRef(() => ProductModule),
  ],
  providers: [ProductMediaResolver, ProductMediaService],
  exports: [ProductMediaService],
})
export class ProductMediaModule {}
