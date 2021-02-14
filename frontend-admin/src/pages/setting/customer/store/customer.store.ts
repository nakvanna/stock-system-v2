// @ts-ignore
import {computed, ref, watch} from "@vue/composition-api";
// @ts-ignore
import {useMutation} from '@vue/apollo-composable';
import {CustomerModel} from "pages/setting/customer/model/customer.model";
import { update_customer_graphql } from "../graphql/update-customer.graphql";
import { remove_customer_graphql } from "../graphql/remove-customer.graphql";
import { customer_graphql } from "../graphql/customer.graphql";
import {create_customer_graphql} from "pages/setting/customer/graphql/create-customer.graphql";

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

export const selected_customer = ref({}) as any;
/*** CRUD Action ***/

/*CREATE*/
export function createCustomer(prop: any, context: any) {
  //--variables--//
  const create_data = ref<CustomerModel>({} as CustomerModel);
  //--end-variables--//

  //--computed--//
  const mapped = computed(function () {
    const copy = Object.assign({}, create_data.value);
    return {
      ...copy,
    }
  });
  //--end-computed--//

  //--function--//
  const createCustomerData = async () => {
    await create().then((data: any) => {
      onSuccess(data?.data.createCustomer, context);
    })
  }
  //--end-function--//

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_customer_graphql, () => ({
    variables: {create_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.createCustomer.success) {
      create_data.value = {} as CustomerModel;
      context.emit('on-success')
    }
  })
  //--end-create-vue apollo--//

  //--return--//
  return {
    create_data,
    createCustomerData,
    mapped
  }
}

//---R-E-A-D---//
export const readCustomer = (table: any) => {
  //variables
  const grid_data = ref({
    selected: [],
    record_value: {
      total_record: 0,
      total_item: 0
    },
    query: {
      products: customer_graphql,
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
  //Filter
  watch(filter, (condition: any) => {
    table?.value?.filterTable(condition, 15, true)
  })
  //set selected value
  watch(grid_data.value, (value: any) => {
    if (value.selected.length) {
      selected_customer.value = JSON.parse(JSON.stringify(value.selected[0]))
    }
  })
  //functions
  const showAll = () => table?.value?.filterTable(filter.value, 0, false);
  const mapCustomer = (x: any) => {
    return {
      ...x.node,
      address1: x.node.address1 === null ? "គ្មានទីតាំង" : x.node.address1,
      address2: x.node.address2 === null ? "គ្មានទីតាំង" : x.node.address2,
      createdAt: new Date(new Date(x.node.createdAt).toDateString()),
    }
  };

  const dateStatusMessage = (duration: { from: any, to: any }) => {
    if (new Date(new Date().toDateString()) >= new Date(duration.from) && new Date(new Date().toDateString()) <= new Date(duration.to)) {
      return {
        message: 'ដល់',
        color: 'blue-5',
      }
    }
    if (new Date(duration.to) < new Date()) {
      return {
        message: 'ហួស',
        color: 'red-5',
      }
    }
    if (new Date() < new Date(duration.to)) {
      return {
        message: 'មិនទាន់ដល់',
        color: 'orange-5',
      }
    }
  }
  //return
  return {
    //variables
    grid_data,
    //computed
    //functions
    mapCustomer,
    showAll,
    dateStatusMessage
  }
};

/*UPDATE*/
export function updateCustomer(prop: any, context: any) {
  //--variables--//
  const update_data = ref<CustomerModel>({} as CustomerModel);
  //--end variables--//

  //computed
  const mapped = computed(() => {
    const copy = Object.assign({}, update_data.value);
    delete copy._id
    return copy
  })

  //--function--//
  const updateCustomerData = async (id: string, key: string, value: any) => {
    update_data.value._id = id;
    //@ts-ignore
    update_data.value[key] = value;
    await update().then((data: any) => {
      onSuccess(data?.data.updateCustomer, context);
    })
  }
  //--end function--//

  //--update vue apollo--//
  const {mutate: update, onDone} = useMutation(update_customer_graphql, () => ({
    variables: {id: update_data.value!._id, update_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.updateCustomer.success) {
      update_data.value = {} as CustomerModel
    }
  })
  //--end vue apollo--//

  return {
    updateCustomerData
  }
}

/*DELETE*/
export function deleteCustomer(prop: any, context: any, table: any) {
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
        onSuccess(data?.data.removeCustomer, context);
      })
    })
  }
  //--end function--//

  //--remove vue apollo--//
  const {mutate: remove, onDone} = useMutation(remove_customer_graphql, () => ({
    variables: {id: id.value}
  }));

  onDone((data: any) => {
    if (data.data.removeCustomer.success) {
      table.value.refetch();
    }
  })
  //--end remove vue apollo--//

  return {
    removeData
  }
}
