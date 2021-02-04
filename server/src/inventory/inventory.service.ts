import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ErrorHandlingMessage} from '../../shared/utils';
import {applyPagination, InputCursorPaginationOption,} from '../../shared/cursor-pagination';
import {InventoryModel} from "./models/inventory.model";
import { CreateInventoryInput } from './input/create-inventory.input';
import {InventoryCursorPagination} from "./dto/inventory.dto";
import { UpdateInventoryInput } from './input/update-inventory.input';

@Injectable()
export class InventoryService {
    constructor(@InjectModel('Inventory') private model: Model<InventoryModel>) {
    }

    async create(
        create_input: CreateInventoryInput,
    ): Promise<InventoryModel | ErrorHandlingMessage> {
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
    ): Promise<InventoryCursorPagination> {
        return await applyPagination(this.model, options);
    }

    async findOne(id: string): Promise<InventoryModel | ErrorHandlingMessage> {
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
        update_input: UpdateInventoryInput,
    ): Promise<InventoryModel | ErrorHandlingMessage> {
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

    async remove(id: string): Promise<InventoryModel | ErrorHandlingMessage> {
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

    async findByPurchase(purchase_id: string): Promise<InventoryModel[]> {
        return this.model.find({purchase_id})
    }

    async findByProductOption(product_option_id: string): Promise<InventoryModel[]>{
        return this.model.find({product_option_id, purchase_status: 'Recieve'});
    }
}
