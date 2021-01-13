<template>
  <q-page v-if="result" class="bg-grey-3">
    <div class="q-pa-lg row bg-white" style="margin-left: 150px; margin-right: 150px">
      <div class="col-6 q-pr-xs">
        <div class="full-width q-pb-xs">
          <q-img
            spinner-color="red"
            :src="result.product.product_media.filter(f => f.position === image_position)[0].src"
            style="height: 60%; width: 380px"
          />
        </div>
        <div class="row q-gutter-xs">
          <q-card
            :key="image_index"
            v-for="(image, image_index) in result.product.product_media"
            class="list-image-card"
          >
            <q-img
              class="cursor-pointer col q-pl-md"
              :src="image.src"
              spinner-color="red"
              style="height: 100%"
              @click="image_position = image.position"
            />
          </q-card>
        </div>
      </div>
      <div class="col-6">
        <q-card class="q-pa-md bg-transparent">
          <div class="row">
            <span class="col text-h4 text-weight-bold">
              {{result.product.title}}
            </span>
          </div>
          <div class="row text-h6 text-weight-bold">
            <div v-if="product_option_filtered.length">
              <span>${{ product_option_filtered[0].price.toFixed(2) }}</span>
            </div>
            <div v-else>
              <span v-if="result.product.product_option.length > 1">
                  ${{ Math.min.apply(Math, result.product.product_option.map(m => m.price)).toFixed(2) }}
                  -
                  ${{ Math.max.apply(Math, result.product.product_option.map(m => m.price)).toFixed(2) }}
              </span>
              <span v-if="result.product.product_option.length === 1">
                  ${{ result.product.product_option[0].price.toFixed(2) }}
              </span>
            </div>
          </div>
          <div class="row q-pt-md" v-if="result.product.variant1 !== null">
            <div class="col" >
              <span class="text-h6">{{ result.product.variant1.name }}</span>
              <div>
                <q-select :hint="result.product.variant1.name" dense outlined v-model="variants.variant1" :options="result.product.variant1.values"/>
              </div>
            </div>
          </div>
          <div class="row q-pt-md" v-if="result.product.variant2 !== null">
            <div class="col" >
              <span class="text-h6">{{ result.product.variant2.name }}</span>
              <div>
                <div>
                  <q-select :hint="result.product.variant2.name" dense outlined v-model="variants.variant2" :options="result.product.variant2.values"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row q-pt-md" v-if="result.product.variant3 !== null">
            <div class="col" >
              <span class="text-h6">{{ result.product.variant3.name }}</span>
              <div>
                <q-select :hint="result.product.variant3.name" dense outlined v-model="variants.variant3" :options="result.product.variant3.values"/>
              </div>
            </div>
          </div>
          <div class="row q-pa-md q-gutter-sm">
            <q-btn class="col-6" style="background: #FF0080; color: white" label="Add to cart" />
            <q-btn class="col" style="background: goldenrod; color: white" label="Buy it now" />
          </div>
          <div class="q-pt-md row">
            <div v-html="result.product.description"/>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {reactive, ref, watch} from "@vue/composition-api";
import {useQuery} from "@vue/apollo-composable";
import {product_option_one_graphql} from "pages/product-page/graphql/product-page.graphql";

export default {
  setup(props: any, context: any){
    const image_position = ref(1);
    const product_option_filtered = ref<any>([]);
    const select = ref();

    const variants = reactive({
      variant1: null,
      variant2: null,
      variant3: null,
    });

    const variables = reactive({
      id: context.root.$route.params.id
    });

    watch(variants, (value: any) => {
      product_option_filtered.value = result.value.product.product_option.filter(
        (f: any) => f.option1 === value.variant1 && f.option2 === value.variant2 && f.option3 === value.variant3);
      if (product_option_filtered.value.length){
        console.log(product_option_filtered.value.length)
        image_position.value = product_option_filtered.value[0].image_position
      }
    })

    const {result} = useQuery(
      product_option_one_graphql,
      () => variables,
    );

    return {
      result,
      variants,
      image_position,
      product_option_filtered,
      select
    }
  }
}

</script>

<style lang="sass" scoped>
.my-card
  height: 520px
.image-view-card
  width: 400px
.list-image-card
  width: 75px
  height: 75px
</style>
