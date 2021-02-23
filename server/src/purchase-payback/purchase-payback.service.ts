import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorHandlingMessage } from '../../shared/utils';
import {
  applyPagination,
  InputCursorPaginationOption,
} from '../../shared/cursor-pagination';
import {PurchasePaybackModel} from "./models/purchase-payback.model";
import { CreatePurchasePaybackInput } from './input/create-purchase-payback.input';
import { PurchasePaybackCursorPagination } from './dto/purchase-payback.dto';
import { UpdatePurchasePaybackInput } from './input/update-purchase-payback.input';

@Injectable()
export class PurchasePaybackService {
  constructor(@InjectModel('PurchasePayback') private model: Model<PurchasePaybackModel>) {}

  async create(
    create_input: CreatePurchasePaybackInput,
  ): Promise<PurchasePaybackModel | ErrorHandlingMessage> {
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
  ): Promise<PurchasePaybackCursorPagination> {
    return await applyPagination(this.model, options);
  }

  async findOne(id: string): Promise<PurchasePaybackModel | ErrorHandlingMessage> {
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
    update_input: UpdatePurchasePaybackInput,
  ): Promise<PurchasePaybackModel | ErrorHandlingMessage> {
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

  async remove(id: string): Promise<PurchasePaybackModel | ErrorHandlingMessage> {
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

  async findByPurchase(purchase_id: string): Promise<PurchasePaybackModel[]> {
    return this.model.find({purchase_id})
  }
}
