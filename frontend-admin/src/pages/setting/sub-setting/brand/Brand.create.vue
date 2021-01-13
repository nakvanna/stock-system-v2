<template>
  <q-dialog transition-show="slide-down"
            transition-hide="slide-down"
            v-model="isShow"
            persistent
  >
    <q-card>
      <q-card-section class="q-pt-none">
        <q-form
          @submit="createData"
        >
          <div class="row">
            <q-input
              class="full-width"
              v-model="create_data.name"
              label="ឈ្មោះម៉ូដ"
              hint="បំពេញឈ្មោះ"
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
          </div>
          <div class="row q-mt-md">
            <q-btn rounded flat class="bg-blue-1" color="primary" type="submit"
                   label="រក្សាទុក"/>
            <q-space/>
            <q-btn rounded flat class="bg-transparent" color="negative" label="បិទ" v-close-popup/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "@vue/composition-api";
import {createBrand} from "pages/setting/sub-setting/brand/store/brand.store";

export default {
  name: "brand.create",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  setup(props: any, context: any){
    const dialog = ref(false);
    const isShow = computed({
      get: () => props.value,
      set: (value) => {
        context.emit("input", value);
      },
    });

    const {createData, create_data} = createBrand(props, context)

    return {
      dialog,
      isShow,
      create_data,
      createData,
    }
  }
}
</script>

<style scoped>

</style>
