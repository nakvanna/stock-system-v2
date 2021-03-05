import {computed, ref, watch} from "@vue/composition-api";
import {useMutation} from "@vue/apollo-composable";
import {PurchaseModel} from "pages/purchase/model/purchase.model";
import {remove_purchase_graphql} from "pages/purchase/graphql/remove-purchase.graphql";
import {update_purchase_graphql } from "../graphql/update-sale.graphql";
import {create_sale_graphql} from "pages/sale/graphql/create-sale.graphql";
import { sale_graphql } from "../graphql/sale.graphql";
import {SaleModel} from "pages/sale/model/sale.model";


//--OnDone message--//
function onSuccess(_data: any, context: any) {
  if (_data.success) {
    context.root.$q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: _data.message
    });
  } else {
    context.root.$q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: _data.message
    });
  }
}

export const selected_sale = ref({}) as any;
/***CRUD Action***/

/*CREATE*/
export function createSale(prop: any, context: any) {
  //--variables--//
  const create_data = ref<SaleModel>({
    description: '',
    amount: 0,
    paid_amount: 0,
    due_amount: 0,
    create_sale_item_input: [],
    sale_status: 'Pending'
  });
  //--end-variables--//

  //--computed--//
  const mapped = computed(function () {
    return {
      ...create_data.value,
      customer_id: create_data.value.customer_id?._id,
      amount: create_data.value.amount,
      create_sale_item_input: create_data.value.create_sale_item_input.map((m: any) => {
        return {
          sale_id: '',
          product_option_id: m._id,
          sale_status: create_data.value.sale_status,
          sale_qty: m.sale_qty,
          discount: m.discount,
          tax: m.tax,
          sale_price: m.sale_price,
        }
      })
    }
  });
  //--end-computed--//

  //--function--//
  const createSaleData = async () => {
    await create().then((data: any) => {
      onSuccess(data?.data.createSale, context);
    })
  }
  //--end-function--//

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_sale_graphql, () => ({
    variables: {create_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.createSale.success) {
      create_data.value = {
        description: '',
        amount: 0,
        paid_amount: 0,
        due_amount: 0,
        create_sale_item_input: [],
        sale_status: 'Pending'
      };
      context.emit('on-success')
    }
  })
  //--end-create-vue apollo--//

  //--return--//
  return {
    create_data,
    createSaleData,
    mapped
  }
}

//---R-E-A-D---//
export const readPurchase = (table: any) => {
  //variables
  const grid_data = ref({
    selected: [],
    record_value: {
      total_record: 0,
      total_item: 0
    },
    query: {
      sales: sale_graphql,
    },
    filter: {
      customer_id: {
        $eq: null
      },
    }
  })
  //computed
  const filter = computed(() => {
    return Object.assign({}, grid_data.value.filter);
  })
  //watch
  watch(filter, (condition: any) => {
    table?.value?.filterTable(condition, 15, true)
  })
  //set selected value
  watch(grid_data.value, (value: any) => {
    if (value.selected.length) {
      selected_sale.value = JSON.parse(JSON.stringify(value.selected[0]))
    }
  })
  //functions
  const showAll = () => table?.value?.filterTable(filter.value, 0, false);
  const mapSale = (x: any) => {
    const amount = x.node.due_amount;
    // const payback = x.node.purchase_payback.map((m: any) => m.payback).reduce((a: number, b: number) => a + b, 0)
    return {
      ...x.node,
      amount_index: `$${x.node.amount.toFixed(2)}`,
      paid_amount_index: `$${x.node.paid_amount.toFixed(2)}`,
      due_amount_index: "$" + amount,
      customer_name: x.node.customer.business_name,
      sale_date: x.node.sale_date,
      createdAt: x.node.createdAt,
      // purchase_date: new Date(new Date(x.node.purchase_date).toDateString()),
      // createdAt: new Date(new Date(x.node.createdAt).toDateString()),
    }
  };


  //return
  return {
    //variables
    grid_data,
    //computed
    //functions
    mapSale,
    showAll,
  }
};

/*UPDATE*/
export function updatePurchase(prop: any, context: any) {
  //--variables--//
  const update_data = ref<PurchaseModel | any>({});
  //--end variables--//

  //computed
  const mapped = computed(() => {
    const copy = Object.assign({}, update_data.value);
    delete copy._id
    return copy
  })

  //--function--//
  const updatePurchaseData = async (id: string, key: string, value: any) => {
    update_data.value._id = id;
    //@ts-ignore
    update_data.value[key] = value;
    await update().then((data: any) => {
      onSuccess(data?.data.updatePurchase, context);
    })
  }
  //--end function--//

  //--update vue apollo--//
  const {mutate: update, onDone} = useMutation(update_purchase_graphql, () => ({
    variables: {id: update_data.value!._id, update_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.updatePurchase.success) {
      update_data.value = {};
    }
  })
  //--end vue apollo--//

  return {
    updatePurchaseData,
    update_data
  }
}

/*DELETE*/
export function deletePurchase(prop: any, context: any, table: any) {
  //--variables--//
  const id = ref("");
  //--end variables--//

  //--function--//
  const removePurchaseData = (_id: string) => {
    id.value = _id;
    context.root.$q.dialog({
      title: 'ផ្ទៀងផ្ទាត់',
      message: 'ពិតជាចង់ដំណើរការ?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await remove().then((data: any) => {
        onSuccess(data?.data.removePurchase, context);
      })
    })
  }
  //--end function--//

  //--remove vue apollo--//
  const {mutate: remove, onDone} = useMutation(remove_purchase_graphql, () => ({
    variables: {id: id.value}
  }));

  onDone((data: any) => {
    if (data.data.removePurchase.success) {
      table.value.refetch();
    }
  })
  //--end remove vue apollo--//

  return {
    removePurchaseData
  }
}
