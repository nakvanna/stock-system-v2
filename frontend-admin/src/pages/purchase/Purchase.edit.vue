<template>
  <q-page class="q-pa-md">
    <q-form>
      <div class="row q-pa-md q-gutter-lg">
        <span class="text-h6 text-bold">កែប្រែទំនិញថ្មី</span>
        <q-space/>
        <q-btn outline to="/purchases" icon="fas fa-arrow-alt-circle-left"/>
      </div>
      <q-separator/>
      <div class="row q-pt-sm">
        <div class="col-8 q-pb-md q-pr-xs">
          <q-card style="min-width: 100%">
            <q-card-section>
              <div class="row">
                <div class="col-4">
                  <span>ឈ្មោះអ្នកផ្គត់ផ្គង់</span>
                  <div class="row">
                    <strong>{{selected_purchase.supplier.name}}</strong>
                    <q-popup-edit
                      @save="updatePurchaseData(selected_purchase._id, 'supplier_id', selected_purchase.supplier._id)"
                      v-model="selected_purchase.supplier.name"
                    >
                      <search-select
                        class="q-pr-xs"
                        dense :validate="false"
                        outlined
                        label="ឈ្មោះ"
                        v-model="selected_purchase.supplier"
                        option_label="name"
                        :query="query.supplier"
                        query_name="suppliers"
                        :hide_selected="true"
                        search_field="name"
                      >
                        <template v-slot:option="scope">
                          <q-item
                            v-bind="scope.itemProps"
                            v-on="scope.itemEvents"
                          >
                            <q-item-section>
                              <q-item-label class="text-primary">
                                {{ scope.opt.name }} - ({{ scope.opt.company }})
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
                    </q-popup-edit>
                  </div>
                </div>
                <div class="col-4">
                  <span>កាលបរិច្ឆេទ</span>
                  <div class="row">
                    <strong>{{new Date(selected_purchase.purchase_date).toLocaleDateString()}}</strong>
                    <q-popup-edit
                      @save="updatePurchaseData(selected_purchase._id, 'purchase_date', selected_purchase.purchase_date)"
                      v-model="selected_purchase.purchase_date"
                    >
                      <date-picker
                        :validate="false"
                        class="q-pr-xs" label="ថ្ងៃទិញ"
                        v-model="selected_purchase.purchase_date"
                      />
                    </q-popup-edit>
                  </div>
                </div>
                <div class="col-4">
                  <span>លក្ខណៈ</span>
                  <div class="row">
                    <strong>{{ selected_purchase.purchase_status }}</strong>
                    <q-popup-edit
                      @save="updatePurchaseStatus(selected_purchase._id, 'purchase_status', selected_purchase.purchase_status)"
                      v-model="selected_purchase.purchase_status"
                    >
                      <q-select
                        outlined dense
                        v-model="selected_purchase.purchase_status"
                        :options="['Pending', 'Receive']"
                        label="Status"
                      />
                    </q-popup-edit>
                  </div>
                </div>
              </div>
              <div class="col q-mt-md">
                <span>ចំណាំ: </span>
                <div class="row">
                  <strong v-html="selected_purchase.description" />
                  <q-popup-edit
                    @save=""
                    v-model="selected_purchase.description"
                  >
                    <q-editor
                      v-model="selected_purchase.description"
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
                  </q-popup-edit>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4 q-pb-md">
          <q-card style="min-width: 100%">
            <q-card-section>
              <div class="text-center">
                <div v-show="false">
                  {{ selected_purchase.amount = amount }}
                  {{ selected_purchase.due_amount = due_amount }}
                </div>
                <span class="text-h5">
                  <strong>សរុប</strong> ${{ amount.toFixed(2) }}
                </span>
              </div>
              <div class="row">
                <div class="text-primary text-h6 col-6 q-pr-xs">
                  <strong>ចំណាយ</strong> ${{ selected_purchase.paid_amount.toFixed(2) }}
                  <q-popup-edit v-model.number="selected_purchase.paid_amount">
                    <q-input prefix="$" type="number" v-model.number="selected_purchase.paid_amount" dense autofocus />
                  </q-popup-edit>
                </div>
                <div class="text-negative text-h6 col-6">
                  <strong>ជំពាក់</strong> ${{ selected_purchase.due_amount.toFixed(2) }}
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
              <div>
                <q-table
                  :data="create_inventory_input"
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
    </q-form>
  </q-page>
</template>

<script lang="ts">
import {computed, reactive, ref, watch} from "@vue/composition-api";
import SearchSelect from "components/SearchSelect.vue";
import DatePicker from "components/DatePicker.vue";
import {supplier_graphql} from "pages/purchase/view/graphql/supplier.graphql";
import {filter_product_option_graphql} from "pages/setting/product/view/graphql/product-option.graphql";
import {updatePurchase} from "pages/purchase/store/purchase.store";
import {selected_purchase} from "pages/purchase/store/purchase.store"
import {updateInventory} from "pages/purchase/view/store/inventory.store";

export default {
  name: "Purchase.edit",
  components: {DatePicker, SearchSelect},
  setup: function (props: any, context: any) {
    const purchase_data = ref<any>({});
    const create_inventory_input = ref([]);
    const columns = ref([
      {
        align: 'left',
        name: 'action',
      }, {
        align: 'left',
        name: 'product',
        label: 'ទំនិញ',
      }, {
        align: 'left',
        name: 'purchase_qty',
        label: 'ចំនួន',
      }, {
        align: 'left',
        name: 'buy_price',
        label: 'តម្លៃទិញ',
      }, {
        align: 'left',
        name: 'discount',
        label: 'បញ្ចុះតម្លៃ',
      }, {
        align: 'left',
        name: 'tax',
        label: 'ពន្ធ',
      }, {
        align: 'left',
        name: 'net_cost',
        label: 'តម្លៃដើមសរុប',
      }, {
        align: 'left',
        name: 'sell_price',
        label: 'តម្លៃលក់',
      },
    ]);
    const query = reactive({
      supplier: supplier_graphql,
      product_option: filter_product_option_graphql,
    });

    create_inventory_input.value = selected_purchase.value.inventory.map((m: any) => {
      return {
        id: m._id,
        sku: m.product_option.sku,
        buy_price: m.buy_price,
        price: m.product_option.price,
        option1: m.product_option.option1,
        option2: m.product_option.option2,
        option3: m.product_option.option3,
        product: { _id: m.product_option.product._id, title: m.product_option.product.title },
        purchase_qty: m.purchase_qty,
        discount: m.discount,
        tax: m.tax,
      }
    });
    const updatePurchaseStatus = ((id: string, key: string, value: string) => {
      updatePurchaseData(id, key, value);
      updateInventoryData(id, key, value);
    })
    const {updatePurchaseData} = updatePurchase(props, context);
    const {updateInventoryData} = updateInventory(props, context);

    const amount = computed(() => {
      if (create_inventory_input.value) {
        return create_inventory_input.value.map((m: any) => {
          return (m.purchase_qty * m.buy_price) - ((m.purchase_qty * m.buy_price * m.discount) / 100) + ((m.purchase_qty * m.buy_price * m.tax) / 100)
        }).reduce((a: number, b: number) => a + b, 0)
      }
    });

    const due_amount = computed(() => {
      if (create_inventory_input.value) {
        return selected_purchase.value.amount - selected_purchase.value.paid_amount;
      }
    });

    const removeProductOption = ((index: any) => {
      create_inventory_input.value.splice(index, 1)
    });

    const inputSelect = ((data: any) => {
      const exist = create_inventory_input.value.some((s: any) => s.sku === data.sku);
      if (!exist) {
        delete data.product_id;
        create_inventory_input.value.push({
          ...data, // @ts-ignore
          purchase_qty: 1, buy_price: 0, discount: 0, tax: 0,
        });
      }
    });

    return {
      create_inventory_input,
      columns,
      query,
      purchase_data,
      removeProductOption,
      inputSelect,
      due_amount,
      amount,
      updatePurchaseData,
      selected_purchase,
      updatePurchaseStatus,
    }
  }
}
</script>

<style scoped>

</style>
