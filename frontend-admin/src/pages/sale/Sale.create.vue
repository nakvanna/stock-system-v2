<template>
  <q-page class="q-pa-xs">
    <q-form @submit="createSaleData">
      <div class="row q-pa-xs q-gutter-lg">
        <span class="text-h6 text-bold">លក់ទំនិញ</span>
        <q-space/>
        <q-btn outline to="/sales" icon="fas fa-arrow-alt-circle-left"/>
      </div>
      <q-separator/>
      <div class="row q-pt-sm">
        <div class="col-8 q-pb-md q-pr-xs">
          <q-card style="min-width: 100%">
            <q-card-section>
              <div class="row">
                <search-select
                  class="col-4 q-pr-xs"
                  dense
                  outlined
                  label="ជ្រើសរើសអ្នកផ្គត់ផ្គង់"
                  v-model="create_data.customer_id"
                  hint="ជ្រើសរើសអ្នកផ្គត់ផ្គង់"
                  option_label="business_name"
                  :query="query.customer"
                  query_name="customers"
                  :hide_selected="true"
                  search_field="business_name"
                >
                  <template v-slot:option="scope">
                    <q-item
                      v-bind="scope.itemProps"
                      v-on="scope.itemEvents"
                    >
                      <q-item-section>
                        <q-item-label class="text-primary">
                          <span class="text-h6">
                            {{ scope.opt.business_name }}
                          </span>
                        </q-item-label>
                        <q-item-label class="text-primary">
                          {{ scope.opt.contact_lastname }} - {{ scope.opt.contact_firstname }}
                        </q-item-label>
                        <q-item-label caption class="q-gutter-sm">
                          <q-badge color="blue-1" text-color="blue" :label="scope.opt.phone"/>
                          <q-badge color="blue-1" text-color="blue" :label="scope.opt.email"/>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator/>
                  </template>
                </search-select>
                <date-picker class="col-4 q-pr-xs" label="ថ្ងៃលក់ទំនិញ" v-model="create_data.sale_date" />
                <q-select
                  outlined dense
                  class="col-4"
                  v-model="create_data.sale_status"
                  :options="['Pending', 'Receive']"
                  hint="ជ្រើសរើសប្រភេទ"
                  label="Status"
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
                <div v-show="false">
                  {{ create_data.amount = amount }}
                  {{ create_data.due_amount = due_amount }}
                </div>
                <span class="text-h5">
                  <strong>សរុប</strong> ${{ amount.toFixed(2) }}
                </span>
              </div>
              <div class="row">
                <div class="text-primary text-h6 col-6 q-pr-xs">
                  <strong>ចំណាយ</strong> ${{ create_data.paid_amount }}
                  <q-popup-edit v-model.number="create_data.paid_amount">
                    <q-input prefix="$" type="number" v-model.number="create_data.paid_amount" dense autofocus />
                  </q-popup-edit>
                </div>
                <div class="text-negative text-h6 col-6">
                  <strong>ជំពាក់</strong> ${{ create_data.due_amount.toFixed(2) }}
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
                label="ជ្រើសរើសទំនិរួម"
                hint="ជ្រើសរើសទំនិញ"
                option_label="title"
                :query="query.product_option"
                query_name="products"
                :hide_selected="true"
                search_field="title"
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
                        {{ scope.opt.title }} - ({{ scope.opt.product_option.length }})
                      </q-item-label>
<!--                      <q-item-label caption class="q-gutter-sm">-->
<!--                        <q-badge color="blue-1" text-color="blue" :label="scope.opt.option1"/>-->
<!--                        <q-badge color="blue-1" text-color="blue" :label="scope.opt.option2"/>-->
<!--                        <q-badge color="blue-1" text-color="blue" :label="scope.opt.option3"/>-->
<!--                      </q-item-label>-->
                    </q-item-section>
                  </q-item>
                  <q-separator/>
                </template>
              </search-select>
              <div>
                <q-table
                  :data="create_data.create_sale_item_input"
                  :columns="columns"
                  row-key="sku"
                  :rows-per-page-options="[0]"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="action" :props="props">
                        <q-btn @click="removeProductOption(props.pageIndex)" outline dense round color="negative" icon="clear" />
                      </q-td>
                      <q-td key="product" :props="props">
                        {{ props.row.title }} - ({{props.row.sku}})
                      </q-td>
                      <q-td key="purchase_qty" :props="props">
                        <q-input v-model.number="props.row.sale_qty" type="number" />
                      </q-td>
                      <q-td key="buy_price" :props="props">
                        <q-input v-model.number="props.row.sale_price" type="number" prefix="$"/>
                      </q-td>
                      <q-td key="discount" :props="props">
                        <q-input v-model.number="props.row.discount" type="number" prefix="%" />
                      </q-td>
                      <q-td key="tax" :props="props">
                        <q-input v-model.number="props.row.tax" type="number" prefix="%" />
                      </q-td>
                      <q-td key="net_cost" :props="props">
                        ${{
                          ((props.row.sale_qty * props.row.sale_price)
                            -
                            ((props.row.sale_qty * props.row.sale_price * props.row.discount) / 100)
                            +
                            ((props.row.sale_qty * props.row.sale_price * props.row.tax) / 100)).toFixed(2)
                        }}
                      </q-td>
                      <q-td key="sale_price" :props="props">
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
    {{mapped}}
  </q-page>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, watch} from "@vue/composition-api";
import SearchSelect from "components/SearchSelect.vue";
import DatePicker from "components/DatePicker.vue";
import {product_option_from_product} from "pages/setting/product/graphql/product.graphql";
import {createSale} from "pages/sale/store/sale.store";
import {customer_graphql} from "pages/sale/view/graphql/customer.graphql";

export default defineComponent({
  name: "PurchaseCreate",
  components: {DatePicker, SearchSelect},

  setup(props: any, context: any){
    const columns = ref([
      {
        align: 'left',
        name: 'action',
      },{
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
        label: 'តម្លៃលក់',
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
      },
    ]);
    const query = reactive({
      customer: customer_graphql,
      product_option: product_option_from_product
    });

    const {create_data, createSaleData, mapped} = createSale(props, context);

    const amount = computed(()=> {
      if (create_data.value.create_sale_item_input){
        return create_data.value.create_sale_item_input.map((m: any) => {
          return (m.sale_qty * m.sale_price) - ((m.sale_qty * m.sale_price * m.discount) / 100) + ((m.sale_qty * m.sale_price * m.tax) / 100)
        }).reduce((a: number, b: number) => a + b, 0)
      }
    });

    // watch(create_data.value, (val: any) => {
    //   val.due_amount = val.amount - val.paid_amount;
    // });

    const due_amount = computed(() => {
      if (create_data.value.create_sale_item_input){
        return parseFloat(amount.value) - parseFloat(create_data.value.paid_amount)
      }
    })

    const removeProductOption = ((index: any) => {
      create_data.value.create_sale_item_input.splice(index, 1)
    });

    const inputSelect = ((data: any) => {
      for (let i = 0; i < data.product_option.length; i ++){
        const exist = create_data.value.create_sale_item_input.some((s: any) => s.sku === data.product_option[i].sku);
        if ( !exist ){
          delete data.product_option[i].product_id;
          create_data.value.create_sale_item_input.push({
            ...data.product_option[i],
            title: data.title,
            sale_qty: 1,
            sale_price: 0,
            discount: 0,
            tax: 0,
          })
        }
      }
    });

    return {
      createSaleData,
      create_data,
      query,
      inputSelect,
      columns,
      amount,
      due_amount,
      mapped,
      removeProductOption
    }
  }
})
</script>

<style scoped>

</style>
