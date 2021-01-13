<template>
  <q-page v-if="result" class="bg-grey-3">
    <div class="q-pa-lg row bg-white" style="margin-left: 150px; margin-right: 150px">
      <div class="row q-gutter-md">
        <q-card
          :key="index" v-for="(item, index) in result.products.edges"
          class="image-card cursor-pointer" @click="productSelected(item.cursor)">
          <q-img :src="item.node.product_media.filter(f => f.position === 1)[0].src"/>
          <q-card-section>
            <q-btn
              @click.stop="addCart()"
              fab
              color="cyan"
              icon="fas fa-cart-plus"
              class="absolute"
              style="top: 0; right: 9px; transform: translateY(-50%);"
            />
            <div class="row no-wrap q-pt-md items-center">
              <div class="col ellipsis">
                {{ item.node.title }}
              </div>
            </div>
            <q-rating
              v-model="stars"
              max="5"
              size="1.5em"
              color="yellow"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              no-dimming
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              <span v-if="item.node.product_option.length > 1">
                ${{ Math.min.apply(Math, item.node.product_option.map(m => m.price)).toFixed(2) }}
                -
                ${{ Math.max.apply(Math, item.node.product_option.map(m => m.price)).toFixed(2) }}
              </span>
              <span v-else-if="item.node.product_option.length === 1">
                ${{ item.node.product_option[0].price.toFixed(2) }}
              </span>
              <span v-else class="text-negative">
                Unavailable
              </span>
            </div>
            <div class="text-caption text-grey">
              {{ item.node.description }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {useQuery} from "@vue/apollo-composable";
import {product_sale_view_graphql} from "pages/product-page/graphql/product-page.graphql";
import {reactive, ref} from "@vue/composition-api";

export default {
  setup(props: any, context: any) {
    const stars = ref(3.5);
    const variables = reactive({
      first: 15,
      after: "",
      condition: JSON.stringify({}),
    });

    function productSelected(id: any) {
      console.log(id)
      context.root.$router.push('/view/sale/'+id)
    }

    function addCart() {
      alert('Add cart..!')
    }

    const {result} = useQuery(
      product_sale_view_graphql,
      () => variables,
    );

    return {
      stars,
      result,
      productSelected,
      addCart,
    }
  }
}
</script>

<style lang="sass" scoped>
.image-card
  width: 200px
</style>

