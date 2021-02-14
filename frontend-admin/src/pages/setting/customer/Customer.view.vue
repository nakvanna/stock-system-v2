<template>
  <q-page v-if="JSON.stringify(selected_customer) !== '{}'">
    <div class="row q-pa-sm q-gutter-lg">
      <span class="text-h6 text-bold">ពត៌មានអតិថជន</span>
      <q-space/>
      <q-btn outline to="/settings/customer" icon="fas fa-arrow-alt-circle-left"/>
    </div>
    <q-separator/>
    <div class="row">
      <div class="col-8 q-pa-sm">
        <q-card style="min-width: 100%">
          <q-card-section>
            <div class="row">
              <div class="col-4">
                <Strong>អាជីវកម្ម</Strong>
                <div class="row q-mt-md q-mb-lg">
                  {{selected_customer.business_name}}
                  <q-popup-edit
                    @save="updateCustomerData(selected_customer._id, 'business_name', selected_customer.business_name)"
                    v-model="selected_customer.business_name"
                  >
                    <q-input
                      outlined
                      dense
                      autofocus
                      class="full-width"
                      v-model="selected_customer.business_name"
                      label="ចំណងជើង"
                    />
                  </q-popup-edit>
                </div>
              </div>
              <div class="col-4">
                <Strong>ត្រកូល</Strong>
                <div class="row q-mt-md q-mb-lg">
                  {{selected_customer.contact_lastname}}
                  <q-popup-edit
                    @save="updateCustomerData(selected_customer._id, 'contact_lastname', selected_customer.contact_lastname)"
                    v-model="selected_customer.contact_lastname"
                  >
                    <q-input
                      outlined
                      dense
                      autofocus
                      class="full-width"
                      v-model="selected_customer.contact_lastname"
                      label="ចំណងជើង"
                    />
                  </q-popup-edit>
                </div>
              </div>
              <div class="col-4">
                <Strong>នាមខ្លួន</Strong>
                <div class="row q-mt-md q-mb-lg">
                  {{selected_customer.contact_firstname}}
                  <q-popup-edit
                    @save="updateCustomerData(selected_customer._id, 'contact_firstname', selected_customer.contact_firstname)"
                    v-model="selected_customer.contact_firstname"
                  >
                    <q-input
                      outlined
                      dense
                      autofocus
                      class="full-width"
                      v-model="selected_customer.contact_firstname"
                      label="ចំណងជើង"
                    />
                  </q-popup-edit>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <Strong>ថ្ងៃកំណើត</Strong>
                <div class="row q-mt-md q-mb-lg">
                  {{selected_customer.date_of_birth}}
                  <q-popup-edit
                    @save="updateCustomerData(selected_customer._id, 'date_of_birth', selected_customer.date_of_birth)"
                    v-model="selected_customer.date_of_birth"
                  >
                    <q-input
                      outlined
                      dense
                      autofocus
                      class="full-width"
                      v-model="selected_customer.date_of_birth"
                      label="ចំណងជើង"
                    />
                  </q-popup-edit>
                </div>
              </div>
              <div class="col-4">
                <Strong>ទូរសព្ទ</Strong>
                <div class="row q-mt-md q-mb-lg">
                  {{selected_customer.phone}}
                  <q-popup-edit
                    @save="updateCustomerData(selected_customer._id, 'phone', selected_customer.phone)"
                    v-model="selected_customer.phone"
                  >
                    <q-input
                      outlined
                      dense
                      autofocus
                      class="full-width"
                      v-model="selected_customer.phone"
                      label="ចំណងជើង"
                    />
                  </q-popup-edit>
                </div>
              </div>
              <div class="col-4">
                <Strong>អ៊ី-ម៉ែល</Strong>
                <div class="row q-mt-md q-mb-lg">
                  {{selected_customer.email}}
                  <q-popup-edit
                    @save="updateCustomerData(selected_customer._id, 'email', selected_customer.email)"
                    v-model="selected_customer.email"
                  >
                    <q-input
                      outlined
                      dense
                      autofocus
                      class="full-width"
                      v-model="selected_customer.email"
                      label="ចំណងជើង"
                    />
                  </q-popup-edit>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4 q-pa-sm">
        <q-card style="min-width: 100%">
          <q-card-section>
            <div class="row">
              <div class="col">
                <Strong>អាសយដ្ឋានទី១</Strong>
                <div class="row q-mt-md q-mb-lg">
                  {{selected_customer.address1}}
                  <q-popup-edit
                    @save="updateCustomerData(selected_customer._id, 'address1', selected_customer.address1)"
                    v-model="selected_customer.address1"
                  >
                    <q-input
                      outlined
                      dense
                      autofocus
                      class="full-width"
                      v-model="selected_customer.address1"
                      label="ចំណងជើង"
                    />
                  </q-popup-edit>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <Strong>អាសយដ្ឋានទី២</Strong>
                <div class="row q-mt-md q-mb-lg">
                  {{selected_customer.address2}}
                  <q-popup-edit
                    @save="updateCustomerData(selected_customer._id, 'address2', selected_customer.address2)"
                    v-model="selected_customer.address2"
                  >
                    <q-input
                      outlined
                      dense
                      autofocus
                      class="full-width"
                      v-model="selected_customer.address2"
                      label="ចំណងជើង"
                    />
                  </q-popup-edit>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { updateCustomer } from "./store/customer.store";
import { selected_customer } from "./store/customer.store";

export default {
  name: "ProductView",
  components: {selected_customer},
  setup(props: any, context: any){

    const {updateCustomerData} = updateCustomer(props, context);

    return {
      selected_customer,
      updateCustomerData
    }
  }

}
</script>

<style lang="sass" scoped>

</style>
