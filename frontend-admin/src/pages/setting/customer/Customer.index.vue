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
          to="/settings/products/view"/>
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
      :query="grid_data.query.products"
      query_name="customers"
      :pre_map="mapCustomer"
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
        <e-column field='customer_name' headerText='ឈ្មោះទំនាក់ទំនង' textAlign='Left' width="150"/>
        <e-column field='contact_lastname' headerText='ម៉ូដ' textAlign='Left' width="150"/>
        <e-column field='contact_firstname' headerText='ប្រភេទរង' textAlign='Left' width="150"/>
        <e-column field='phone' headerText='លេខទូរសព្ទ' textAlign='Left' width="150"/>
        <e-column field='email' headerText='E-mail' textAlign='Left' width="150"/>
        <e-column field='address1' headerText='ចំណាំ' textAlign='Left' width="150"/>
        <e-column field='address2' headerText='ចំណាំ' textAlign='Left' width="150"/>
        <e-column field='createdAt' headerText='កាលបរិច្ឆេទ' format="d/M/y" type="date" textAlign='Left'/>
      </e-columns>
    </e-j-s-grid>
  </q-page>
</template>

<script lang="ts">
import {ref} from "@vue/composition-api";
import EJSGrid from "components/EJSGrid.vue";
import { readCustomer } from "./store/customer.store";

export default {
  name: "Product.index",
  components: {EJSGrid},
  setup() {
    const table = ref();
    const dialog = ref();
    const {grid_data, mapCustomer, showAll} = readCustomer(table);

    return {
      dialog,
      table,
      mapCustomer,
      grid_data,
      showAll
    }
  }
}
</script>

<style scoped>

</style>
