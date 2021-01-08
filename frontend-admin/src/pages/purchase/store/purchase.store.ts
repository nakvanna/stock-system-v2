import {computed, reactive, ref, watch} from "@vue/composition-api";
import {useMutation} from "@vue/apollo-composable";
import {PurchaseModel} from "pages/purchase/model/purchase.model";
import {remove_purchase_graphql} from "pages/purchase/graphql/remove-purchase.graphql";
import { create_purchase_graphql } from "../graphql/create-purchase.graphql";
import {purchase_graphql} from "pages/purchase/graphql/purchase.graphql";
import { update_purchase_graphql } from "../graphql/update-purchase.graphql";

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

/***CRUD Action***/

/*CREATE*/
export function createPurchase(prop: any, context: any) {
  //--variables--//
  const create_data = ref<PurchaseModel>({
    description: '',
    amount: 0,
    paid_amount: 0,
    due_amount: 0
  });
  //--end-variables--//

  //--computed--//
  const mapped = computed(function () {
    return {
      ...create_data.value,
    }
  });
  //--end-computed--//

  //--function--//
  const createPurchaseData = async () => {
    await create().then((data: any) => {
      onSuccess(data?.data.createPurchase, context);
    })
  }
  //--end-function--//

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_purchase_graphql, () => ({
    variables: mapped.value,
  }));

  onDone((data: any) => {
    if (data.data.createPurchase.success) {
      create_data.value = {};
      context.emit('on-success')
    }
  })
  //--end-create-vue apollo--//

  //--return--//
  return {
    create_data,
    createPurchaseData,
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
      purchases: purchase_graphql,
    },
    filter: {
      study_year: {
        $eq: null
      },
      grade: {
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

  //functions
  const showAll = () => table?.value?.filterTable(filter.value, 0, false);
  const mapPurchase = (x: any) => {
    return {
      ...x.node,
      amount: `$${x.node.amount.toFixed(2)}`,
      paid_amount: `$${x.node.paid_amount.toFixed(2)}`,
      due_amount: `$${x.node.due_amount.toFixed(2)}`,
      purchase_date: new Date(new Date(x.node.createdAt).toDateString()),
      createdAt: new Date(new Date(x.node.createdAt).toDateString()),
    }
  };


  //return
  return {
    //variables
    grid_data,
    //computed
    //functions
    mapPurchase,
    showAll,
  }
};

/*UPDATE*/
export function updatePurchase(prop: any, context: any, table: any) {
  //--variables--//
  const update_data = ref<PurchaseModel>({});
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
    context.root.$q.dialog({
      title: 'ផ្ទៀងផ្ទាត់',
      message: 'ពិតជាចង់ដំណើរការ?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await update().then((data: any) => {
        onSuccess(data?.data.updatePurchase, context);
      })
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
      table.value.refetch();
    }
  })
  //--end vue apollo--//

  return {
    updatePurchaseData
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
