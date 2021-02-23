import {computed, ref} from "@vue/composition-api";
import {useMutation} from "@vue/apollo-composable";
import {update_inventory_purchase_status_graphql} from "pages/purchase/view/graphql/update-inventory.graphql";
import {InventoryModel} from "pages/purchase/view/model/inventory.model";
import {remove_inventories_graphql} from "pages/purchase/view/graphql/remove-inventories.graphql";
import {create_inventories_graphql} from "pages/purchase/view/graphql/create-inventories.graphql";

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

/*CREATE*/
export function createInventories(prop: any, context: any) {
  //--variables--//
  const create_data = ref<InventoryModel[] | any>([]);
  //--end-variables--//

  //--computed--//
  const mapped = computed(function () {
    const copy = JSON.parse(JSON.stringify(create_data.value))
    return copy.map((m: any) => {
      delete m.title;
      delete m.sku;
      delete m.sale_price;
      return {
        ...m,
        stock_qty: m.purchase_qty
      }
    })
  });
  //--end-computed--//

  //--function--//
  const createInventoriesData = async () => {
    await create().then((data: any) => {
      onSuccess(data?.data.createInventories, context);
    })
  }
  //--end-function--//

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_inventories_graphql, () => ({
    variables: {create_input: {multiple: mapped.value}},
  }));

  onDone((data: any) => {
    if (data.data.createInventories.success) {
      context.emit('on-success')
    }
  })
  //--end-create-vue apollo--//

  //--return--//
  return {
    create_data,
    createInventoriesData,
  }
}

/*UPDATE*/
export function updateInventory(prop: any, context: any) {
  //--variables--//
  const update_data = ref<InventoryModel | any>({});
  //--end variables--//

  //computed
  const mapped = computed(() => {
    const copy = Object.assign({}, update_data.value);
    delete copy._id
    return copy
  })

  //--function--//
  const updateInventoryData = async (purchase_id: string, key: string, value: any) => {
    update_data.value.purchase_id = purchase_id;
    //@ts-ignore
    update_data.value[key] = value;
    await update().then((data: any) => {
      console.log(data)
      onSuccess(data?.data.updateInventoryPurchaseStatus, context);
    })
  }
  //--end function--//

  //--update vue apollo--//
  const {mutate: update, onDone} = useMutation(update_inventory_purchase_status_graphql, () => ({
    variables: {purchase_id: update_data.value!.purchase_id, update_input: mapped.value},
  }));

  onDone((data: any) => {
    console.log(data)
    if (data.data.updateInventoryPurchaseStatus.success) {
      update_data.value = {};
    }
  })
  //--end vue apollo--//

  return {
    updateInventoryData,
    update_data
  }
}

/*REMOVES*/
export function deleteInventories(prop: any, context: any) {
  //--variables--//
  const id = ref("");
  //--end variables--//

  //--function--//
  const removeInventoriesData =async (_id: string) => {
    id.value = _id;
    await remove();
  }
  //--end function--//

  //--remove vue apollo--//
  const {mutate: remove} = useMutation(remove_inventories_graphql, () => ({
    variables: {purchase_id: id.value}
  }));

  //--end remove vue apollo--//

  return {
    removeInventoriesData
  }
}

