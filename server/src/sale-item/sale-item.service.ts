import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ErrorHandlingMessage} from '../../shared/utils';
import {applyPagination, InputCursorPaginationOption,} from '../../shared/cursor-pagination';
import {SaleItemModel} from "./models/sale-item.model";
import { CreateSaleItemInput } from './input/create-sale-item.input';
import {SaleItemCursorPagination} from "./dto/sale-item.dto";
import { UpdateSaleItemInput } from './input/update-sale-item.input';

@Injectable()
export class SaleItemService {
    constructor(@InjectModel('SaleItem') private model: Model<SaleItemModel>) {
    }

    async create(
        create_input: CreateSaleItemInput,
    ): Promise<SaleItemModel | ErrorHandlingMessage> {
        try {
            console.log(create_input)
            const model = new this.model(create_input);
            const data = await model.save();
            data.message = 'បានរក្សាទុក';
            data.success = true;
            return data;
        } catch (e) {
            console.log(e)
            return {
                message: e.message.split(':')[0],
                success: false,
            };
        }
    }

    async findAll(
        options: InputCursorPaginationOption,
    ): Promise<SaleItemCursorPagination> {
        return await applyPagination(this.model, options);
    }

    async findOne(id: string): Promise<SaleItemModel | ErrorHandlingMessage> {
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
        update_input: UpdateSaleItemInput,
    ): Promise<SaleItemModel | ErrorHandlingMessage> {
        try {
            const data = await this.model.findByIdAndUpdate(
                id,
                {$set: update_input},
                {new: true},
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

    async updatePurchaseStatus(
        purchase_id: string,
        update_input: UpdateSaleItemInput,
    ): Promise<SaleItemModel | ErrorHandlingMessage> {
        try {
            const data = await this.model.updateMany({purchase_id},
                {$set: update_input},
                {new: true},
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


    async remove(id: string): Promise<SaleItemModel | ErrorHandlingMessage> {
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

    async removeAll(purchase_id: string){
        try {
            await this.model.deleteMany({purchase_id})
            return {
                message: 'បានលុប',
                success: true,
            }
        } catch (e) {
            return {
                message: e.message.split(':')[0],
                success: false,
            };
        }
    }

    async findBySale(sale_id: string): Promise<SaleItemModel[]> {
        return this.model.find({sale_id})
    }

    async findByProductOption(product_option_id: string): Promise<SaleItemModel[]>{
        return this.model.find({product_option_id, purchase_status: 'Receive'});
    }
}
