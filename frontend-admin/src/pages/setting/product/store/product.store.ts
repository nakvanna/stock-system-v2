// @ts-ignore
import {computed, ref, watch} from "@vue/composition-api";
// @ts-ignore
import {useMutation} from '@vue/apollo-composable';
import {OptionModel, ProductModel} from "../model/product.model";
import {remove_product_graphql} from "../graphql/remove-product.graphql";
import {update_product_graphql} from "../graphql/update-product.graphql";
import {product_graphql} from "../graphql/product.graphql";
import {create_product_graphql} from "../graphql/create-product.graphql";

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
export function createProduct(prop: any, context: any) {
  //--variables--//
  const pre_product_option = ref<any>([]);
  const create_data = ref<ProductModel>({
    variant1: {name: 'Size', values: []},
    variant2: {name: 'Color', values: []},
    variant3: {name: 'Style', values: []},
    create_product_option_input: [],
    description: '',
    product_status: 'Draft',
    default_price: 0
  } as ProductModel);
  //--end-variables--//

  //--computed--//
  const mapped = computed(function () {
    const copy = Object.assign({}, create_data.value);
    delete copy.pre_variants;
    delete copy.default_price;
    delete copy.default_sku;
    const copy_pre_product_option = JSON.parse(JSON.stringify(pre_product_option.value));
    return {
      ...copy,
      sub_category_id: create_data.value.sub_category_id?._id,
      brand_id: create_data.value.brand_id?._id,
      variant1: create_data.value.variant1.values.length === 0 ? null: create_data.value.variant1,
      variant2: create_data.value.variant2.values.length === 0 ? null: create_data.value.variant2,
      variant3: create_data.value.variant3.values.length === 0 ? null: create_data.value.variant3,
      create_product_option_input: copy_pre_product_option.length === 0? [{
        product_id: '',
        sku: create_data.value.default_sku,
        weight :0,
        weight_unit:"kg",
        image_position: 0,
        price: create_data.value.default_price,
        barcode: ''
      }] : copy_pre_product_option.map((m: any) => {
        delete m.label;
        return {...m}
      })
    }
  });
  //--end-computed--//

  //--function--//
  const createProductData = async () => {
    await create().then((data: any) => {
      onSuccess(data?.data.createProduct, context);
    })
  }
  //--end-function--//

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_product_graphql, () => ({
    variables: {create_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.createProduct.success) {
      pre_product_option.value = [];
      create_data.value = {
        variant1: {name: 'Size', values: []},
        variant2: {name: 'Color', values: []},
        variant3: {name: 'Style', values: []},
        create_product_option_input: [],
        description: '',
        product_status: 'Draft',
        default_price: 0
      } as ProductModel;
      context.emit('on-success')
    }
  })
  //--end-create-vue apollo--//

  //--return--//
  return {
    create_data,
    pre_product_option,
    createProductData,
    mapped
  }
}

//---R-E-A-D---//
export const readProduct = (table: any) => {
  //variables
  const grid_data = ref({
    selected: [],
    record_value: {
      total_record: 0,
      total_item: 0
    },
    query: {
      products: product_graphql,
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
  //set selected value
  watch(grid_data.value, (value: any) => {
    if (value.selected.length) {
      selected_product.value = JSON.parse(JSON.stringify(value.selected[0]))
    }
  })
  //functions
  const showAll = () => table?.value?.filterTable(filter.value, 0, false);
  const mapProduct = (x: any) => {
    return {
      ...x.node,
      category: x.node.sub_category.category.name,
      sub_category: x.node.sub_category.name,
      brand: x.node.brand.name,
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
    mapProduct,
    showAll,
    dateStatusMessage
  }
};

/*UPDATE*/
export function updateProduct(prop: any, context: any) {
  //--variables--//
  const update_data = ref<ProductModel>({} as ProductModel);
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
      update_data.value = {} as ProductModel
    }
  })
  //--end vue apollo--//

  return {
    updateProductData
  }
}

/*DELETE*/
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
