<template>
  <q-page>
<!--    {{grid_data.selected}}-->
    <div class="row bg-grey-2 q-pa-xs">
      <div class="flex q-gutter-xs full-width">
        <q-btn
          flat round
          size="12px"
          color="blue-5"
          icon="sync"
          @click="table.refetch()"
        />
        <q-btn-dropdown
          :disable="grid_data.selected.length!==1"
          dense size="12px" icon="list_alt"
          flat round color="primary"
        >
          <q-list>
            <q-item clickable v-close-popup dense :to="grid_data.selected.length === 1 ? '/purchase/view/'+grid_data.selected[0]._id: null" >
              <q-item-section side>
                <q-icon name="preview" color="blue-5" />
              </q-item-section>
              <q-item-section>
                <q-item-label>បង្ហាញ</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup dense to="/purchase/edit/" >
              <q-item-section side>
                <q-icon name="edit" color="blue-5" />
              </q-item-section>
              <q-item-section>
                <q-item-label>កែប្រែ</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn flat round size="12px" icon="add" to="/purchase/new"/>
        <div class="q-pt-sm text-subtitle2 text-secondary">
          ទិន្នន័យសរុប {{ grid_data.record_value.total_record - 1 }} ទិន្នន័យបានទាញយក
          {{ grid_data.record_value.total_item }}
        </div>
      </div>
    </div>
    <e-j-s-grid
      ref="table"
      v-model="grid_data.selected"
      :query="grid_data.query.purchases"
      query_name="purchases"
      :pre_map="mapPurchase"
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
        <e-column field='purchase_date' headerText='ថ្ងៃទិញ' format="dd/MMM/y" type="date" textAlign='Left'/>
        <e-column field='supplier_name' headerText='អ្នកផ្គត់ផ្គង់' textAlign='Left' width="150"/>
        <e-column field='purchase_status' headerText='ប្រភេទនៃការទិញ'  textAlign='Left' width="150"/>
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
import {readPurchase, updatePurchase} from "./store/purchase.store";

export default defineComponent({
    name: "Purchase.index",
    components: {EJSGrid},
    setup() {
      const table = ref();
      const dialog = ref();
      const {grid_data, mapPurchase, showAll} = readPurchase(table)

      return {
        table,
        grid_data,
        mapPurchase,
        showAll,
        dialog,
      }
    }
  }
)
</script>

<style scoped>

</style>
