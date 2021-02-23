import {Field, ID, ObjectType, PartialType} from '@nestjs/graphql';
import {CursorPagination} from '../../../shared/cursor-pagination';
import {ErrorHandlingType} from '../../../shared/utils';

@ObjectType()
export class SaleType extends PartialType(ErrorHandlingType) {
    @Field(() => ID, {nullable: true})
    _id: string;
    @Field({nullable: true})
    customer_id: string;
    @Field({nullable: true})
    sale_date: Date;
    @Field({nullable: true})
    sale_status: string;
    @Field({nullable: true})
    amount: number;
    @Field({nullable: true})
    paid_amount: number;
    @Field({nullable: true})
    due_amount: number;
    @Field({nullable: true})
    description: string;
    @Field({nullable: true})
    status: boolean;
}

@ObjectType()
export class SaleCursorPagination extends CursorPagination(SaleType) {
}
