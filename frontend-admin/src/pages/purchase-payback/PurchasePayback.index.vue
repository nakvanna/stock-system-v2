<template>
  <q-page>
    <div class="row bg-grey-2 q-pa-xs">
      <div class="flex q-gutter-xs full-width">
        <q-btn flat round
               size="12px"
               color="blue-5"
               icon="sync"
               @click="table.refetch()"/>
        <q-btn
          :disable="grid_data.selected.length!==1"
          color="blue-5"
          flat round size="12px"
          icon="preview"
          to="/settings/product/view"/>
        <q-btn flat round size="12px" icon="add" to="/settings/products/new"/>
        <div class="q-pt-sm text-subtitle2 text-secondary">
          ទិន្នន័យសរុប {{ grid_data.record_value.total_record - 1 }} ទិន្នន័យបានទាញយក
          {{ grid_data.record_value.total_item }}
        </div>
      </div>
    </div>
    <e-j-s-grid
      ref="table"
      v-model="grid_data.selected"
      :query="grid_data.query.purchase_paybacks"
      query_name="purchase_paybacks"
      :pre_map="mapPurchasePayback"
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
        <e-column field='payback' headerText='ចំនួនសង' textAlign='Left' width="150"/>
        <e-column field='note' headerText='ចំណាំ' textAlign='Left' width="150"/>
        <e-column field='createdAt' headerText='កាលបរិច្ឆេទ' format="d/M/y" type="date" textAlign='Left'/>
      </e-columns>
    </e-j-s-grid>
  </q-page>
</template>

<script lang="ts">
import {ref} from "@vue/composition-api";
import EJSGrid from "components/EJSGrid.vue";
import { readPurchasePayback } from "./store/purchase-payback.store";

export default {
  name: "PurchasePayback.index",
  components: {EJSGrid},
  setup(props: any, context: any) {
    const table = ref();
    const {grid_data, mapPurchasePayback, showAll} = readPurchasePayback(table);
    grid_data.value.filter.purchase_id = context.root.$route.params.id;

    return {
      table,
      mapPurchasePayback,
      grid_data,
      showAll
    }
  }
}
</script>

<style scoped></style>
