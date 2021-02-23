<template>
  <q-page>
    <q-form
      @submit="createPurchasePaybackData"
    >
    <div class="row q-pa-xs q-gutter-lg">
      <span class="text-h6 text-bold">ប្រវត្តិសងជំពាក់</span>
      <q-space/>
        <q-btn outline to="/purchases" icon="fas fa-arrow-alt-circle-left"/>
    </div>
    <q-separator/>
    <div class="row">
      <div class="col-8">
        <div class="row q-pa-md">
          <q-card style="min-width: 100%">
            <q-card-section>
                <div class="row q-mt-md">
                  <q-input
                    outlined
                    dense
                    class="col q-pr-xs"
                    v-model.number="create_data.payback"
                    label="ចំនួនសង"
                    hint="បំពេញឈ្មោះ"
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                  <date-picker class="col" label="ថ្ងៃសង" v-model="create_data.payback_date" />
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
                    toolbar-outline v-model="create_data.note"
                    min-height="5rem"/>
                </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-4">
        <div class="row q-pt-md q-pr-md">
          <q-card style="min-width: 100%">
            <q-card-section>
              <strong>ចំនួនជំពាក់</strong>
              <div class="row q-mt-md">
                <span class="text-h4 text-weight-bold">$150,000.00</span>
              </div>
            </q-card-section>
          </q-card>
        </div>
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

import DatePicker from "components/DatePicker.vue";
import {createPurchasePayback} from "pages/purchase-payback/store/purchase-payback.store";

export default {
  name: "PurchasePayback.create",
  components: {DatePicker},
  setup(props: any, context: any) {
    const {create_data, createPurchasePaybackData, mapped} = createPurchasePayback(props, context);
    create_data.value.purchase_id = context.root.$route.params.id

    return {
      create_data,
      createPurchasePaybackData,
      mapped
    }
  },
}
</script>

<style scoped>

</style>
