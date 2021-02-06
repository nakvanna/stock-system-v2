import {computed, ref, watch} from "@vue/composition-api";
import {useMutation} from "@vue/apollo-composable";
import {PurchaseModel} from "pages/purchase/model/purchase.model";
import {
  update_inventory_purchase_status_graphql
} from "pages/purchase/view/graphql/update-inventory.graphql";
import {InventoryModel} from "pages/purchase/view/model/inventory.model";

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

