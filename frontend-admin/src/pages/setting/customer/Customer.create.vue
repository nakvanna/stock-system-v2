<template>
  <q-page>
    <q-form
      @submit="createCustomerData"
    >
    <div class="row q-pa-md q-gutter-lg">
      <span class="text-h6 text-bold">បន្ថែមអតិថជនថ្មី</span>
      <q-space/>
      <q-btn outline to="/settings" icon="fas fa-arrow-alt-circle-left"/>
    </div>
    <q-separator/>
    <div class="row">
      <div class="col">
        <div class="row q-pa-md">
          <q-card style="min-width: 100%">
            <q-card-section>
              <div class="row q-mt-md">
                <q-input
                  outlined
                  dense
                  class="col-4 q-pr-xs"
                  v-model="create_data.business_name"
                  label="ឈ្មោះអាជីវកម្ម"
                  hint="បំពេញឈ្មោះ"
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input
                  outlined
                  dense
                  class="col-4 q-pr-xs"
                  v-model="create_data.contact_lastname"
                  label="ត្រកូល"
                  hint="បំពេញឈ្មោះ"
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input
                    outlined
                    dense
                    class="col-4"
                    v-model="create_data.contact_firstname"
                    label="ឈ្មោះ"
                    hint="បំពេញឈ្មោះ"
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
              </div>
              <div class="row q-mt-md">
                <q-input
                  outlined
                  dense
                  class="col-4 q-pr-xs"
                  v-model="create_data.phone"
                  label="ទូរសព្ទ"
                  hint="បំពេញឈ្មោះ"
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input
                  outlined
                  dense
                  class="col-4 q-pr-xs"
                  v-model="create_data.email"
                  label="អ៊ី-ម៉ែល"
                  hint="បំពេញឈ្មោះ"
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <date-picker class="col-4 q-pr-xs" label="ថ្ងៃខែឆ្នាំកំណើត" v-model="create_data.date_of_birth" />
              </div>
              <div class="row q-mt-md">
                <q-input
                  outlined
                  dense
                  class="col-6 q-pr-xs"
                  v-model="create_data.address1"
                  label="អាស័យដ្ឋានទី១"
                  hint="បំពេញអាស័យដ្ឋានទី១"
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input
                  outlined
                  dense
                  class="col-6"
                  v-model="create_data.address2"
                  label="អាស័យដ្ឋានទី២"
                  hint="បំពេញអាស័យដ្ឋានទី២"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <q-separator/>
    <div class="q-pb-lg q-px-lg row q-mt-md">
      <q-space/>
      <q-btn
        rounded flat class="bg-blue-1"
        color="primary" type="submit"
        label="រក្សាទុក"
      />
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
import DatePicker from "components/DatePicker.vue";
import { createCustomer } from "./store/customer.store";

export default {
  name: "Product.create",
  components: {DatePicker, TagInput, SearchSelect},
  setup(props: any, context: any) {
    //Search Select Query
    const query = reactive({
      categories: category_graphql,
      sub_categories: filter_sub_categories_graphql,
      brands: brand_graphql,
    });

    const {create_data, createCustomerData, mapped} = createCustomer(props, context);

    return {
      query,
      create_data,
      mapped,
      createCustomerData
    }
  },
}
</script>

<style scoped>

</style>
