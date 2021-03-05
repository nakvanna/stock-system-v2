<template>
  <q-page>
    <div class="row bg-grey-2 q-pa-xs">
      <div class="flex q-gutter-xs full-width">
        <q-btn
          flat round
          size="12px"
          color="blue-5"
          icon="sync"
          @click="table.refetch()"
        />
        <div class="q-pt-xs">
          <q-btn-dropdown
            :disable="grid_data.selected.length!==1"
            dense size="12px" icon="list_alt"
            flat round color="primary"
          >
            <q-list>
              <q-item clickable v-close-popup dense :to="grid_data.selected.length === 1 ? '/sale/view/'+grid_data.selected[0]._id: null" >
                <q-item-section side>
                  <q-icon name="preview" color="blue-5" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>បង្ហាញ</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup dense to="/sale/edit/" >
                <q-item-section side>
                  <q-icon name="edit" color="blue-5" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>កែប្រែ</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div class="q-pt-xs" v-if="grid_data.selected">
          <q-btn-dropdown
            :disable="grid_data.selected.length!==1"
            dense size="12px" icon="bookmarks"
            flat round color="primary"
          >
            <q-list>
              <q-item clickable v-close-popup dense :to="grid_data.selected.length === 1 ? '/purchase/view/payback/'+grid_data.selected[0]._id: null" >
                <q-item-section side>
                  <q-icon name="preview" color="blue-5" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>ប្រវត្តិសង</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup dense :to="grid_data.selected.length === 1 ? '/purchase/payback/'+grid_data.selected[0]._id: null" >
                <q-item-section side>
                  <q-icon name="money" color="blue-5" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>សងត្រឡប់</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <q-btn flat round size="12px" icon="add" to="/sale/new"/>
        <div class="q-pt-sm text-subtitle2 text-secondary">
          ទិន្នន័យសរុប {{ grid_data.record_value.total_record - 1 }} ទិន្នន័យបានទាញយក
          {{ grid_data.record_value.total_item }}
        </div>
      </div>
    </div>
    <e-j-s-grid
      ref="table"
      v-model="grid_data.selected"
      :query="grid_data.query.sales"
      query_name="sales"
      :pre_map="mapSale"
      :record_value.sync="grid_data.record_value"
      is_group
    >
      <e-columns>
        <e-column type='checkbox' width='50'></e-column>
        <e-column
          field='_id'
          :visible="false"
          :isPrimaryKey='true'
        />
        <e-column field='sale_date' headerText='ថ្ងៃទិញ' format="dd/MMM/y" type="date" textAlign='Left'/>
        <e-column field='customer_name' headerText='អ្នកផ្គត់ផ្គង់' textAlign='Left' width="150"/>
        <e-column field='sale_status' headerText='ប្រភេទនៃការទិញ'  textAlign='Left' width="150"/>
        <e-column field='amount_index' headerText='សរុប' textAlign='Left' width="150"/>
        <e-column field='paid_amount_index' headerText='ចំណាយ' textAlign='Left' width="150"/>
        <e-column field='due_amount_index' headerText='ជំពាក់' textAlign='Left' width="150"/>
        <e-column field='createdAt' headerText='កាលបរិច្ឆេទ' format="dd/MMM/y" type="date" textAlign='Left'/>
      </e-columns>
    </e-j-s-grid>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from "@vue/composition-api";
import EJSGrid from "components/EJSGrid.vue";
import {readPurchase, updatePurchase} from "./store/sale.store";

export default defineComponent({
    name: "Purchase.index",
    components: {EJSGrid},
    setup() {
      const table = ref();
      const dialog = ref();
      const {grid_data, mapSale, showAll} = readPurchase(table)

      return {
        table,
        grid_data,
        mapSale,
        showAll,
        dialog,
      }
    }
  }
)
</script>

<style scoped>

</style>
