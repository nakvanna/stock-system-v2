<template>
  <q-page class="q-pa-md" v-if="result">
    <div class="row q-pa-sm q-gutter-sm">
      <span class="text-h6 text-bold">វិក័យបត្រទិញ</span>
      <q-space/>
      <q-btn outline to="/purchases" icon="fas fa-arrow-alt-circle-left"/>
    </div>
    <q-separator/>
    <div class="row q-pt-sm q-gutter-sm">
      <div class="col-6">
        <q-card style="min-width: 100%">
          <q-card-section>
            <div class="row q-gutter-sm">
              <strong>ថ្ងៃទិញ</strong>
              <span>{{ new Date(result.purchase.purchase_date).toDateString()}}</span>
            </div>
            <div class="row q-gutter-sm q-pt-sm">
              <div class="col q-gutter-sm">
                <strong>ប្រភេទនៃការទិញ</strong>
                <span v-if="result.purchase.purchase_status === 'Pending'" class="text-bold text-negative">
                  Pending
                </span>
                <span v-else class="text-primary text-bold">
                  Receive
                </span>
              </div>
              <div class="col q-gutter-sm">
                <strong>តម្លៃសរុប</strong>
                <span class="text-warning text-bold">${{result.purchase.amount.toFixed(2)}}</span>
              </div>
            </div>
            <div class="row q-gutter-sm q-pt-sm">
              <div class="col q-gutter-sm">
                <strong>តម្លៃចំណាយ</strong>
                <span class="text-primary text-bold">${{result.purchase.paid_amount.toFixed(2)}}</span>
              </div>
              <div class="col q-gutter-sm">
                <strong>តម្លៃជំពាក់</strong>
                <span class="text-negative text-bold">${{result.purchase.due_amount.toFixed(2)}}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card style="min-width: 100%">
          <q-card-section>
            <div class="row q-gutter-sm">
              <strong>ក្រុមហ៊ុន</strong>
              <span>{{ result.purchase.supplier.company }}</span>
            </div>
            <div class="row q-gutter-sm q-pt-sm">
              <div class="col q-gutter-sm">
                <strong>ឈ្មោះទំនាក់ទំនង</strong>
                <span>{{result.purchase.supplier.name}}</span>
              </div>
              <div class="col q-gutter-sm">
                <span>{{result.purchase.supplier.address}}</span>
              </div>
            </div>
            <div class="row q-gutter-sm q-pt-sm">
              <div class="col q-gutter-sm">
                <strong>លេខទូរសព្ទ</strong>
                <span>{{result.purchase.supplier.phone}}</span>
              </div>
              <div class="col q-gutter-sm">
                <strong>E-mail</strong>
                <span>{{result.purchase.supplier.email}}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-pt-sm">
      <div class="full-width">
        <q-table
          :data="result.purchase.inventory"
          :columns="columns.column2"
          row-key="name"
          :rows-per-page-options="[0]"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="product_name">
                {{ props.row.product_option.product.title + " (" +props.row.product_option.sku + ")" }}
              </q-td>
              <q-td key="sell_price">
                ${{props.row.product_option.price.toFixed(2)}}
              </q-td>
              <q-td key="purchase_qty">
                {{props.row.purchase_qty}}
              </q-td>
              <q-td key="buy_price">
                ${{props.row.buy_price.toFixed(2)}}
              </q-td>
              <q-td key="total">
                ${{ ((props.row.buy_price ) * ( props.row.purchase_qty)).toFixed(2)}}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">

import {reactive} from "@vue/composition-api";
import {useQuery} from "@vue/apollo-composable";
import {purchase_one_graphql} from "pages/purchase/view/graphql/purchase-one.graphql";

export default {
  name: "Purchase.view",
  setup(props: any, context: any){
    const columns = reactive({
      column1: [],
      column2: [
        {
          name: 'product_name',
          label: 'ទំនិញ',
          align: 'left',
          sortable: true
        },{
          name: 'sell_price',
          label: 'តម្លៃលក់',
          align: 'left',
          sortable: true
        },{
          name: 'purchase_qty',
          label: 'ចំនួនទិញ',
          align: 'left',
          sortable: true
        },{
          name: 'buy_price',
          label: 'តម្លៃទិញ',
          align: 'left',
          sortable: true
        },{
          name: 'total',
          label: 'សរុប',
          align: 'left',
          sortable: true
        },
      ],
      column3: [],
    })
    const variables = reactive({
      id: context.root.$route.params.id
    });

    const {result} = useQuery(
      purchase_one_graphql,
      () => variables,
    );

    return {
      result,
      columns,
    }
  }
}
</script>

<style scoped>

</style>
