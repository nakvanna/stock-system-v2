<template>
  <q-dialog v-model="dialog_data">
    <div class="row">
      <q-card style="min-width: 100%">
        <q-card-section>
          <strong>Media</strong>
          <div class="row q-gutter-md">
            <q-img
              :key="img_index"
              v-for="(img, img_index) in data"
              spinner-color="red"
              :src="img.src"
              style="width: 180px"
            >
              <q-checkbox size="xs" :val="img.position" color="red" v-model="is_selected" />
            </q-img>
          </div>
        </q-card-section>
        <q-separator/>
        <div class="q-pb-lg q-px-lg row q-mt-md">
          <q-space/>
          <q-btn
            :disable="is_selected.length !== 1"
            rounded flat class="bg-blue-1"
            color="primary" label="រក្សាទុក"
            @click="updateImagePosition"
          />
        </div>
      </q-card>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import {computed, PropType, ref} from "@vue/composition-api";
import {updateProductOption} from "pages/setting/product/view/store/product-option.store";

export default {
  name: "AddVariantImage",
  props: {
    value: {
      type: ([Object, String, Array] as unknown) as PropType<any>
    },
    variant_ids: {
      type: ([Object, String, Array] as unknown) as PropType<any>
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  setup(props: any, context: any){
    const is_selected = ref([]);
    const data = computed({
      get: () => props.value,
      set: (value: any) => {
        context.emit('input', value)
      }
    });

    const dialog_data = computed({
      get: () => props.dialog,
      set: (value) => context.emit('update:dialog', value)
    })

    const variant_id = computed({
      get: () => props.variant_ids,
      set: (value) => context.emit('update:variant_ids', value)
    })

    const updateImagePosition = (()=>{
      for (const i in variant_id.value) {
        updateData(variant_id.value[i], 'image_position', is_selected.value[0])
      }
    })

    const { update_data, updateData, mapped } = updateProductOption(props, context)

    return {
      dialog_data,
      is_selected,
      data,
      variant_id,
      updateData,
      mapped,
      update_data,
      updateImagePosition
    }
  }
}
</script>

<style lang="sass" scoped>
  .img-card
    width: 100%
    max-width: 250px
</style>
