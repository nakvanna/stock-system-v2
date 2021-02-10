<template>
  <q-page>
    <q-form
      @submit="createProductData"
    >
    <div class="row q-pa-md q-gutter-lg">
      <span class="text-h6 text-bold">បន្ថែមទំនិញថ្មី</span>
      <q-space/>
      <q-btn outline to="/settings" icon="fas fa-arrow-alt-circle-left"/>
    </div>
    <q-separator/>
    <div class="row">
      <div class="col-8">
        <div class="row q-pa-md">
          <q-card style="min-width: 100%">
            <q-card-section>
                <div class="row q-mt-md">
                  <search-select
                    class="col-4"
                    dense
                    outlined
                    label="ប្រភេទ"
                    v-model="sub_category_condition.filter.category_id.$eq"
                    hint="ជ្រើសរើសប្រភេទ"
                    option_label="name"
                    :query="query.categories"
                    query_name="categories"
                    :hide_selected="true"
                    search_field="name"
                  />
                  <search-select
                    dense
                    outlined
                    class="col-4 q-pl-xs"
                    v-model="create_data.sub_category_id"
                    label="ប្រភេទរង"
                    hint="ជ្រើសរើសប្រភេទរង"
                    option_label="name"
                    :query="query.sub_categories"
                    query_name="sub_categories"
                    :hide_selected="true"
                    search_field="name"
                    ref="sub_cate"
                  />
                  <search-select
                    dense
                    outlined
                    class="col-4 q-pl-xs"
                    v-model="create_data.brand_id"
                    label="ម៉ូដ"
                    hint="ជ្រើសរើសម៉ូដ"
                    option_label="name"
                    :query="query.brands"
                    query_name="brands"
                    :hide_selected="true"
                    search_field="name"
                  />
                </div>
                <div class="row q-mt-md">
                  <q-input
                    outlined
                    dense
                    class="full-width"
                    v-model="create_data.title"
                    label="ចំណងជើង"
                    hint="បំពេញឈ្មោះ"
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                </div>
                <div class="row q-mt-md">
                  <strong>ពណ៌នា</strong>
                  <q-editor
                    class="full-width" :toolbar="[
                  [
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      list: 'only-icons',
                      options: ['left', 'center', 'right', 'justify']
                    }
                  ],
                  ['bold', 'italic', 'strike', 'underline'],
                  ['undo', 'redo'],
                  ['viewsource']
                ]"
                    toolbar-outline v-model="create_data.description"
                    min-height="5rem"/>
                </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-pa-md">
          <q-card style="height: 100px;min-width: 100%">
            <q-card-section>
              <strong>Media</strong>
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-pa-md">
          <q-card style="min-width: 100%">
            <q-card-section>
              <strong>Variants</strong>
              <div class="row q-gutter-sm">
                <q-checkbox v-model="is_variant" label="តើទំនិញនេះមានជម្រើសច្រើនមែនទ?"/>
                <q-space/>
                <q-btn v-if="is_variant" class="text-negative" flat round dense icon="clear" @click="minus"/>
                <q-btn v-if="is_variant" flat round dense icon="add" @click="plus"/>
              </div>
<!--              <div v-if="is_variant" v-for="(item, index) in create_data.pre_variants" class="row q-mt-md">
                  <q-input
                    outlined
                    dense
                    class="col-4"
                    v-model="item.name"
                    :label="'ឈ្មោះជម្រើសទី'+(index+1)"
                    hint="ឧទារហ៍ Color"
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                  <tag-input
                    class="col-8 q-pl-xs"
                    dense outlined
                    :label="'តម្លៃជម្រើសទី'+(index+1)"
                    v-model="item.values"
                    hint="ឧទារហ៍ Black, White..."
                  >
                    <q-btn
                      size="10px" round
                      icon="delete"
                      color="red-4" flat
                      @click="minus(index)"
                    />
                  </tag-input>
                </div>-->
              <div v-if="variants.v1" class="row q-mt-md">
                  <q-input
                    outlined
                    dense
                    class="col-4"
                    v-model="create_data.variant1.name"
                    label="ឈ្មោះជម្រើសទី១"
                    hint="ឧទារហ៍ Size"
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                  <tag-input
                    :validate="false"
                    class="col-8 q-pl-xs"
                    dense outlined
                    label="តម្លៃជម្រើសទី១"
                    v-model="create_data.variant1.values"
                    hint="ឧទារហ៍ Small, Medium..."
                  >
<!--                    <q-btn-->
<!--                      size="10px" round-->
<!--                      icon="delete"-->
<!--                      color="red-4" flat-->
<!--                      @click="minus(1)"-->
<!--                    />-->
                  </tag-input>
              </div>
              <div v-if="variants.v2" class="row q-mt-md">
                <q-input
                  outlined
                  dense
                  class="col-4"
                  v-model="create_data.variant2.name"
                  label="ឈ្មោះជម្រើសទី២"
                  hint="ឧទារហ៍ Color"
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <tag-input
                  :validate="false"
                  class="col-8 q-pl-xs"
                  dense outlined
                  label="តម្លៃជម្រើសទី២"
                  v-model="create_data.variant2.values"
                  hint="ឧទារហ៍ Black, White..."
                >
                </tag-input>
              </div>
              <div v-if="variants.v3" class="row q-mt-md">
                <q-input
                  outlined
                  dense
                  class="col-4"
                  v-model="create_data.variant3.name"
                  label="ឈ្មោះជម្រើសទី៣"
                  hint="ឧទារហ៍ Style"
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <tag-input
                  :validate="false"
                  class="col-8 q-pl-xs"
                  dense outlined
                  label="តម្លៃជម្រើសទី៣"
                  v-model="create_data.variant3.values"
                  hint="ឧទារហ៍ New Style, Old Style..."
                >
                </tag-input>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-4">
        <div class="row q-pa-md">
          <q-card style="min-width: 100%">
            <q-card-section>
              <strong>Other</strong>
              <div class="row q-mt-md">
                <q-select
                  outlined dense
                  class="full-width"
                  v-model="create_data.product_status"
                  :options="['Draft', 'Active']"
                  label="Status"
                />
              </div>
              <div class="row q-mt-md">
                <tag-input
                  :validate="false"
                  class="full-width"
                  dense outlined
                  label="Tags"
                  v-model="create_data.tags"
                />
              </div>
              <div class="row q-mt-md">
                <q-input
                  class="full-width"
                  dense outlined
                  v-model.number="create_data.default_price"
                  label="Price"
                />
              </div>
              <div class="row q-mt-md">
                <q-input
                  class="full-width"
                  dense outlined
                  v-model="create_data.default_sku"
                  label="SKU (Stock Keeping Unit)"
                />
              </div>
              <div class="row q-mt-md">
                <q-input
                  class="full-width"
                  dense outlined
                  v-model="create_data.default_barcode"
                  label="Barcode (No Variant)"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div v-if="is_variant" class="row q-px-md q-pb-md">
      <div class="full-width">
        <q-card style="min-width: 100%">
          <q-card-section>
            <strong>បង្កើតជម្រើស</strong>
            <table style="border: #1D1D1D solid 1px"
                   class="q-table q-table--cell-separator">
              <tr>
                <th class="text-left">
                  Variant
                </th>
                <th class="text-left">
                  SKU
                </th>
                <th class="text-left">
                  Price
                </th>
                <th class="text-left">
                  Barcode
                </th>
                <th></th>
              </tr>
                <tr :key="index" v-for="(option, index) in pre_product_option">
                  <td class="text-bold text-secondary" style="width: 20%">
                    {{option.label}}
                  </td>
                  <td class="text-secondary" style="width: 35%">
                    <q-input dense outlined v-model="option.sku" />
                  </td>
                  <td class="text-secondary" style="width: 20%">
                    <q-input dense outlined v-model.number="option.price" />
                  </td>
                  <td class="text-secondary" style="width: 20%">
                    <q-input dense outlined v-model="option.barcode" />
                  </td>
                  <td class="text-negative" style="width: 5%">
                    <q-btn flat round @click="removeSku(index)" icon="fas fa-trash-alt"/>
                  </td>
                </tr>
            </table>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-separator/>
    <div class="q-pb-lg q-px-lg row q-mt-md">
      <q-space/>
      <q-btn rounded flat class="bg-blue-1" color="primary" type="submit"
             label="រក្សាទុក"/>
    </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">

import SearchSelect from "components/SearchSelect.vue";
import {computed, reactive, ref, watch} from "@vue/composition-api";
import {category_graphql} from "pages/setting/sub-setting/category/graphql/category.graphql";
import {filter_sub_categories_graphql} from "pages/setting/sub-setting/sub-category/graphql/sub-category.graphql";
import {brand_graphql} from "pages/setting/sub-setting/brand/graphql/brand.graphql";
import TagInput from "components/TagInput.vue";
import {createProduct} from "pages/setting/product/store/product.store";

export default {
  name: "Product.create",
  components: {TagInput, SearchSelect},
  setup(props: any, context: any) {
    const is_variant = ref(false);
    const sub_cate = ref();
    const variants = reactive({
      v1: false,
      v2: false,
      v3: false,
    });

    //Condition filter
    const sub_category_condition = reactive({
      filter: {
        category_id: {
          $eq: null
        }
      }
    });

    //Search Select Query
    const query = reactive({
      categories: category_graphql,
      sub_categories: filter_sub_categories_graphql,
      brands: brand_graphql,
    });

    //Filter Sub-category after Category selected
    const filter_sub_category = computed(() => {
      const copy = Object.assign({}, JSON.parse(JSON.stringify(sub_category_condition.filter)));
      if (copy.category_id.$eq == null) {
        delete copy.category_id
      } else {
        // @ts-ignore
        copy.category_id.$eq = copy.category_id.$eq?._id
      }
      return copy;
    })

    //Passing condition
    watch(() => filter_sub_category.value, (val) => {
      sub_cate.value.filterSelect(val)
    });

    //Check when Variant has
    watch(is_variant, () => {
      if (is_variant.value){
        variants.v1 = true;
      }
      else {
        variants.v1 = false;
        create_data.value.variant1 = {name: 'Size', values: []}
        variants.v2 = false;
        create_data.value.variant2 = {name: 'Color', values: []}
        variants.v3 = false;
        create_data.value.variant3 = {name: 'Style', values: []}
      }
    })

    //Plus variant
    function plus() {
      if (variants.v1 === true && variants.v2 === false){
        variants.v2 = true
      }else if (variants.v2 && variants.v3 === false){
        variants.v3 = true;
      }
    }

    //Minus variant
    function minus() {
      if (variants.v3 && variants.v2 && variants.v1){
        variants.v3 = false;
        create_data.value.variant3 = {name: 'Style', values: []}
      } else if (variants.v2 && variants.v1){
        variants.v2 = false;
        create_data.value.variant2 = {name: 'Color', values: []}
      } else {
        is_variant.value = false;
      }
    }

    const {create_data, createProductData, pre_product_option, mapped} = createProduct(props, context);

    //Remove SKU List
    function removeSku(index: number) {
      pre_product_option.value.splice(index, 1);
    }

    //When 1 variant 2 variants & 3 variants
    watch(create_data.value, (val: any)=> {
      pre_product_option.value = [];
      if (variants.v1 && !variants.v2 && !variants.v3) {
        if (val.variant1.values){
          for (let i = 0; i < val.variant1.values.length; i ++){
            pre_product_option.value.push({
              product_id: '',
              sku: create_data.value.default_sku === undefined ? "" : create_data.value.default_sku+'-'+(i + 1),
              price: create_data.value.default_price,
              barcode: '',
              weight: 0,
              weight_unit: "kg",
              image_position: 0,
              option1: val.variant1.values[i],
              label: val.variant1.values[i],
            })
          }
        }
      }
      else if (variants.v1 && variants.v2 && !variants.v3){
        let i1 = 0;
        if (val.variant1.values && val.variant2.values)
        {
          pre_product_option.value = [];
          for (let i = 0; i < val.variant1.values.length; i ++){
            for (let j = 0; j < val.variant2.values.length; j ++){
              i1 ++;
              pre_product_option.value.push({
                product_id: '',
                sku: create_data.value.default_sku === undefined ? "" : create_data.value.default_sku+'-'+i1,
                price: create_data.value.default_price,
                barcode: '',
                weight: 0,
                weight_unit: "kg",
                image_position: 0,
                option1: val.variant1.values[i],
                option2: val.variant2.values[j],
                label: val.variant1.values[i]+'/'+val.variant2.values[j],
              })
            }
          }
        }
      }
      else if(variants.v1 && variants.v2 && variants.v3) {
        let i1 = 0;
        if(val.variant1.values && val.variant2.values && val.variant3.values){
          for (let i = 0; i < val.variant1.values.length; i ++){
            for (let j = 0; j < val.variant2.values.length; j ++){
              for (let k = 0; k < val.variant3.values.length; k ++){
                i1 ++;
                pre_product_option.value.push({
                  product_id: '',
                  sku: create_data.value.default_sku === undefined ? "" : create_data.value.default_sku+'-'+i1,
                  price: create_data.value.default_price,
                  barcode: '',
                  weight: 0,
                  weight_unit: "kg",
                  image_position: 0,
                  option1: val.variant1.values[i],
                  option2: val.variant2.values[j],
                  option3: val.variant3.values[k],
                  label:  val.variant1.values[i]+'/'+val.variant2.values[j]+'/'+val.variant3.values[k],
                })
              }
            }
          }
        }
      }
    })

    return {
      query, is_variant,
      sub_category_condition,
      sub_cate,variants,
      filter_sub_category,
      create_data,
      pre_product_option,
      plus, minus,
      createProductData,
      removeSku,
      mapped
    }
  },
}
</script>

<style scoped>

</style>
