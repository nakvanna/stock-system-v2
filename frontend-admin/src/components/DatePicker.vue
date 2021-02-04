<template>
  <div>
    <q-input
      v-if="validate" dense outlined
      :label="label" :hint="hint?hint:null"
      v-model="date" mask="date"
      :rules="['date']" autocomplete="off"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="បិទ" color="primary" flat></q-btn>
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      v-else dense outlined
      :label="label" :hint="hint?hint:null"
      v-model="date" mask="date" autocomplete="off"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="បិទ" color="primary" flat></q-btn>
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import {computed} from "@vue/composition-api";

export default {
  name: "DatePicker",
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
      required: true
    },
    validate: {
      type: Boolean,
      default: true
    },
    hint: {
      type: String,
    },
    outlined: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
  },
  setup(props: any, {emit}: any) {
    const date = computed({
      get: () => props.value,
      set: (value) => {
        emit('input', value)
      }
    })
    return {
      date
    }
  }
}
</script>

<style scoped>

</style>
