<template>
  <q-page class="q-pa-md">
    <q-form @submit="">
      <div class="row q-pa-md q-gutter-lg">
        <span class="text-h6 text-bold">បន្ថែមទំនិញថ្មី</span>
        <q-space/>
        <q-btn outline to="/purchases" icon="fas fa-arrow-alt-circle-left"/>
      </div>
      <div class="row">
        <div class="col-8 q-pb-md q-pr-xs">
          <q-card style="min-width: 100%">
            <q-card-section>
              <div class="row">
                <search-select
                  class="col-4 q-pr-xs"
                  dense
                  outlined
                  label="ប្រភេទ"
                  v-model="create_data.supplier_id"
                  hint="ជ្រើសរើសប្រភេទ"
                  option_label="name"
                  :query="query.supplier"
                  query_name="categories"
                  :hide_selected="true"
                  search_field="name"
                />
                <search-select
                  class="col-4  q-pr-xs"
                  dense
                  outlined
                  label="ប្រភេទ"
                  v-model="create_data.purchase_date"
                  hint="ជ្រើសរើសប្រភេទ"
                  option_label="name"
                  :query="query.supplier"
                  query_name="categories"
                  :hide_selected="true"
                  search_field="name"
                />
                <search-select
                  class="col-4"
                  dense
                  outlined
                  label="ប្រភេទ"
                  v-model="create_data.purchase_status"
                  hint="ជ្រើសរើសប្រភេទ"
                  option_label="name"
                  :query="query.supplier"
                  query_name="categories"
                  :hide_selected="true"
                  search_field="name"
                />
              </div>
              <div class="row q-mt-md">
                <strong>ចំណាំ</strong>
                <q-editor
                  v-model="create_data.description"
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
                  toolbar-outline min-height="5rem"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4 q-pb-md">
          <q-card style="min-width: 100%">
            <q-card-section>
              <div class="text-center">
                <span class="text-h6">$1500.00</span>
              </div>
              <div class="row">
                <div class="col-6 q-pr-xs">
                  <q-input label="Paid" v-model="create_data.paid_amount" type="number"/>
                </div>
                <div class="col-6">
                  <q-input label="Due" v-model="create_data.due_amount" type="number"/>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row">
        <div class="full-width">
          <q-card style="min-width: 100%">
            <q-card-section>
              <search-select
                dense class="q-pb-xs"
                outlined
                label="ប្រភេទ"
                v-model="create_data.product_id"
                hint="ជ្រើសរើសទំនិញ"
                option_label="sku"
                :query="query.product_option"
                query_name="product_options"
                :hide_selected="true"
                search_field="sku"
                @input="inputSelect"
                :validate="false"
              >
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    v-on="scope.itemEvents"
                  >
                    <q-item-section>
                      <q-item-label class="text-primary">
                        {{ scope.opt.product.title }} - ({{ scope.opt.sku ? scope.opt.sku : 'មិនមាន' }})
                      </q-item-label>
                      <q-item-label caption class="q-gutter-sm">
                        <q-badge color="blue-1" text-color="blue" :label="scope.opt.option1"/>
                        <q-badge color="blue-1" text-color="blue" :label="scope.opt.option2"/>
                        <q-badge color="blue-1" text-color="blue" :label="scope.opt.option3"/>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator/>
                </template>
              </search-select>
              <div v-if="selected_data.length">
                <q-table
                  :data="selected_data"
                  :columns="columns"
                  row-key="sku"
                  hide-bottom
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="product" :props="props">
                        {{ props.row.product.title }} - ({{props.row.sku}})
                      </q-td>
                      <q-td key="purchase_qty" :props="props">
                        <q-input v-model.number="props.row.purchase_qty" type="number" />
                      </q-td>
                      <q-td key="buy_price" :props="props">
                        <q-input v-model.number="props.row.buy_price" type="number" prefix="$"/>
                      </q-td>
                      <q-td key="discount" :props="props">
                        <q-input v-model.number="props.row.discount" type="number" prefix="%" />
                      </q-td>
                      <q-td key="tax" :props="props">
                        <q-input v-model.number="props.row.tax" type="number" prefix="%" />
                      </q-td>
                      <q-td key="net_cost" :props="props">
                        ${{
                          ((props.row.purchase_qty * props.row.buy_price)
                            -
                            ((props.row.purchase_qty * props.row.buy_price * props.row.discount) / 100)
                            +
                            ((props.row.purchase_qty * props.row.buy_price * props.row.tax) / 100)).toFixed(2)
                        }}
                      </q-td>
                      <q-td key="sell_price" :props="props">
                        <q-input v-model.number="props.row.price" prefix="$"/>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
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
import {computed, defineComponent, reactive, ref} from "@vue/composition-api";
import {createBrand} from "pages/brand/store/brand.store";
import {createGlobal} from "pages/global.store";
import {create_brand_graphql} from "pages/brand/graphql/create-brand.graphql";
import {BrandModel} from "pages/brand/model/brand.model";
import SearchSelect from "components/SearchSelect.vue";
import { createPurchase } from "./store/purchase.store";
import {category_graphql} from "pages/setting/sub-setting/category/graphql/category.graphql";
import {filter_sub_categories_graphql} from "pages/setting/sub-setting/sub-category/graphql/sub-category.graphql";
import {brand_graphql} from "pages/setting/sub-setting/brand/graphql/brand.graphql";
import {filter_product_option_graphql} from "pages/setting/product/view/graphql/product-option.graphql";

export default defineComponent({
  name: "PurchaseCreate",
  components: {SearchSelect},

  setup(props: any, context: any){
    const selected_data = ref<any>([]);
    const columns = ref([
      {
        align: 'left',
        name: 'product',
        label: 'ទំនិញ',
      },{
        align: 'left',
        name: 'purchase_qty',
        label: 'ចំនួន',
      },{
        align: 'left',
        name: 'buy_price',
        label: 'តម្លៃទិញ',
      },{
        align: 'left',
        name: 'discount',
        label: 'បញ្ចុះតម្លៃ',
      },{
        align: 'left',
        name: 'tax',
        label: 'ពន្ធ',
      },{
        align: 'left',
        name: 'net_cost',
        label: 'តម្លៃដើមសរុប',
      },{
        align: 'left',
        name: 'sell_price',
        label: 'តម្លៃលក់',
      },
    ])
    const query = reactive({
      supplier: category_graphql,
      product_option: filter_product_option_graphql,
    });
    const {create_data} = createPurchase(props, context)

    const inputSelect = ((data: any) => {
      const exist = selected_data.value.some((s: any) => s.sku === data.sku);
      if ( !exist ){
        selected_data.value.push({
          ...data,
          purchase_qty: 1,
          buy_price: 0,
          discount: 0,
          tax: 0,
        })
      }
    })
    return {
      create_data,
      query,
      inputSelect,
      selected_data,
      columns,
    }
  }
})
</script>

<style scoped>

</style>
