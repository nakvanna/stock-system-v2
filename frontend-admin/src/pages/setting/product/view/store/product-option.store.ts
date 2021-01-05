// @ts-ignore
import {computed, ref, watch} from "@vue/composition-api";
// @ts-ignore
import {useMutation} from '@vue/apollo-composable';
import {ProductOptionModel} from "pages/setting/product/view/model/product-option.model";
import { update_product_option_graphql } from "../graphql/update-product-option.graphql";

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
/*** CRUD Action ***/

/*UPDATE*/
export function updateProductOption(prop: any, context: any) {
  //--variables--//
  const update_data = ref<ProductOptionModel>({});
  //--end variables--//

  //computed
  const mapped = computed(() => {
    const copy = Object.assign({}, update_data.value);
    delete copy._id
    return copy
  })

  //--function--//
  const updateData = async (id: string, key: string, value: any) => {
    update_data.value._id = id;
    //@ts-ignore
    update_data.value[key] = value;
    await update().then((data: any) => {
      onSuccess(data?.data.updateProductOption, context);
    })
  }
  //--end function--//

  //--update vue apollo--//
  const {mutate: update, onDone} = useMutation(update_product_option_graphql, () => ({
    variables: {id: update_data.value!._id, update_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.updateProductOption.success) {
      update_data.value = {} as ProductOptionModel
    }
  })
  //--end vue apollo--//

  return {
    updateData,
    update_data,
    mapped
  }
}

/*DELETE*/
/*export function deleteProduct(prop: any, context: any, table: any) {
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
}*/
