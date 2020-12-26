import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorHandlingMessage } from '../../shared/utils';
import {
  applyPagination,
  InputCursorPaginationOption,
} from '../../shared/cursor-pagination';
import { ProductMediaModel } from './models/product-media.model';
import { CreateProductMediaInput } from './input/create-product-media.input';
import { ProductMediaCursorPagination } from './dto/product-media.dto';
import { UpdateProductMediaInput } from './input/update-product-media.input';

@Injectable()
export class ProductMediaService {
  constructor(
    @InjectModel('ProductMedia') private model: Model<ProductMediaModel>,
  ) {}

  async create(
    create_input: CreateProductMediaInput,
  ): Promise<ProductMediaModel | ErrorHandlingMessage> {
    try {
      const model = new this.model(create_input);
      const data = await model.save();
      data.message = 'បានរក្សាទុក';
      data.success = true;
      return data;
    } catch (e) {
      return {
        message: e.message.split(':')[0],
        success: false,
      };
    }
  }

  async findAll(
    options: InputCursorPaginationOption,
  ): Promise<ProductMediaCursorPagination> {
    return await applyPagination(this.model, options);
  }

  async findOne(id: string): Promise<ProductMediaModel | ErrorHandlingMessage> {
    try {
      const data = await this.model.findById(id);
      data.message = 'បានស្វែងរក';
      data.success = true;
      return data;
    } catch (e) {
      return {
        message: e.message.split(':')[0],
        success: false,
      };
    }
  }

  async update(
    id: string,
    update_input: UpdateProductMediaInput,
  ): Promise<ProductMediaModel | ErrorHandlingMessage> {
    try {
      const data = await this.model.findByIdAndUpdate(
        id,
        { $set: update_input },
        { new: true },
      );
      data.message = 'បានកែប្រែ';
      data.success = true;
      return data;
    } catch (e) {
      return {
        message: e.message.split(':')[0],
        success: false,
      };
    }
  }

  async remove(id: string): Promise<ProductMediaModel | ErrorHandlingMessage> {
    try {
      const data = await this.model.findById(id);
      await this.model.findByIdAndDelete(id);
      data.message = 'បានលុប';
      data.success = true;
      return data;
    } catch (e) {
      return {
        message: e.message.split(':')[0],
        success: false,
      };
    }
  }

  async findByProduct(product_id: string): Promise<ProductMediaModel[]> {
    return this.model.find({ product_id });
  }
}
