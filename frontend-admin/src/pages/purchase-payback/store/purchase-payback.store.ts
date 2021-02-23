import {computed, ref, watch} from "@vue/composition-api";
import {useMutation} from '@vue/apollo-composable';
import {PurchasePaybackModel} from "pages/purchase-payback/model/purchase-payback.model";
import { create_purchase_payback_graphql } from "../graphql/create-purchase-payback.graphql";
import {purchase_payback_graphql} from "pages/purchase-payback/graphql/purchase-payback.graphql";

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

export const selected_product = ref({}) as any;
/*** CRUD Action ***/

/*CREATE*/
export function createPurchasePayback(prop: any, context: any) {
  //--variables--//
  const create_data = ref<PurchasePaybackModel>({
    note: ''
  });
  //--end-variables--//

  //--computed--//
  const mapped = computed(function () {
    return create_data.value
  });
  //--end-computed--//

  //--function--//
  const createPurchasePaybackData = async () => {
    await create().then((data: any) => {
      onSuccess(data?.data.createPurchasePayback, context);
    })
  }
  //--end-function--//

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_purchase_payback_graphql, () => ({
    variables: {create_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.createPurchasePayback.success) {
      create_data.value = {note: ''} as PurchasePaybackModel;
      context.emit('on-success')
    }
  })
  //--end-create-vue apollo--//

  //--return--//
  return {
    create_data,
    createPurchasePaybackData,
    mapped
  }
}

//---R-E-A-D---//
export const readPurchasePayback = (table: any) => {
  //variables
  const grid_data = ref({
    selected: [],
    record_value: {
      total_record: 0,
      total_item: 0
    },
    query: {
      purchase_paybacks: purchase_payback_graphql,
    },
    filter: {
      purchase_id: {
        $eq: null
      },
    }
  })
  //computed
  const filter = computed(() => {
    return Object.assign({}, grid_data.value.filter);
  })
  //watch
  //Filter
  watch(filter, (condition: any) => {
    table?.value?.filterTable(condition, 15, true)
  })

  //functions
  const showAll = () => table?.value?.filterTable(filter.value, 0, false);
  const mapPurchasePayback = (x: any) => {
    return {
      ...x.node,
      createdAt: new Date(new Date(x.node.createdAt).toDateString()),
    }
  };

  //return
  return {
    //variables
    grid_data,
    //computed
    //functions
    mapPurchasePayback,
    showAll,
  }
};

/*
/!*UPDATE*!/
export function updateProduct(prop: any, context: any) {
  //--variables--//
  const update_data = ref<PurchasePaybackModel>({} as PurchasePaybackModel);
  //--end variables--//

  //computed
  const mapped = computed(() => {
    const copy = Object.assign({}, update_data.value);
    delete copy._id
    return copy
  })

  //--function--//
  const updateProductData = async (id: string, key: string, value: any) => {
    update_data.value._id = id;
    //@ts-ignore
    update_data.value[key] = value;
    await update().then((data: any) => {
      onSuccess(data?.data.updateProduct, context);
    })
  }
  //--end function--//

  //--update vue apollo--//
  const {mutate: update, onDone} = useMutation(update_product_graphql, () => ({
    variables: {id: update_data.value!._id, update_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.updateProduct.success) {
      update_data.value = {} as PurchasePaybackModel
    }
  })
  //--end vue apollo--//

  return {
    updateProductData
  }
}

/!*DELETE*!/
export function deleteProduct(prop: any, context: any, table: any) {
  //--variables--//
  const id = ref("");
  //--end variables--//

  //--function--//
  const removeData = (_id: string) => {
    id.value = _id;
    context.root.$q.dialog({
      title: 'ផ្ទៀងផ្ទាត់',
      message: 'ពិតជាចង់ដំណើរការ?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await remove().then((data: any) => {
        onSuccess(data?.data.removeProduct, context);
      })
    })
  }
  //--end function--//

  //--remove vue apollo--//
  const {mutate: remove, onDone} = useMutation(remove_product_graphql, () => ({
    variables: {id: id.value}
  }));

  onDone((data: any) => {
    if (data.data.removeProduct.success) {
      table.value.refetch();
    }
  })
  //--end remove vue apollo--//

  return {
    removeData
  }
}
*/
