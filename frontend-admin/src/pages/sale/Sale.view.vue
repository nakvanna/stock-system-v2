<template>
  <q-page class="q-pa-xs" v-if="result">
    <div class="row q-pa-xs q-gutter-sm">
      <span class="text-h6 text-bold">វិក័យបត្រលក់</span>
      <q-space/>
      <q-btn outline to="/sales" icon="fas fa-arrow-alt-circle-left"/>
    </div>
    <q-separator/>
    <div class="row q-pt-sm q-gutter-sm">
      <div class="col-6">
        <q-card style="min-width: 100%">
          <q-card-section>
            <div class="row q-gutter-sm">
              <strong>ថ្ងៃលក់</strong>
              <span>{{ new Date(result.sale.sale_date).toDateString()}}</span>
            </div>
            <div class="row q-gutter-sm q-pt-sm">
              <div class="col q-gutter-sm">
                <strong>ប្រភេទនៃការលក់</strong>
                <span v-if="result.sale.sale_status === 'Pending'" class="text-bold text-negative">
                  Pending
                </span>
                <span v-else class="text-primary text-bold">
                  Receive
                </span>
              </div>
              <div class="col q-gutter-sm">
                <strong>តម្លៃសរុប</strong>
                <span class="text-warning text-bold">${{result.sale.amount.toFixed(2)}}</span>
              </div>
            </div>
            <div class="row q-gutter-sm q-pt-sm">
              <div class="col q-gutter-sm">
                <strong>តម្លៃចំណាយ</strong><br>
                <span class="text-primary text-bold">${{result.sale.paid_amount.toFixed(2)}}</span>
              </div>
              <div class="col q-gutter-sm">
                <strong>តម្លៃជំពាក់</strong><br>
                <span class="text-negative text-bold">${{result.sale.due_amount.toFixed(2)}}</span>
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
              <span>{{ result.sale.customer.business_name }}</span>
            </div>
            <div class="row q-gutter-sm q-pt-sm">
              <div class="col q-gutter-sm">
                <strong>ឈ្មោះទំនាក់ទំនង</strong>
                <span>{{result.sale.customer.contact_firstname + ' ' +result.sale.customer.contact_lastname}}</span>
              </div>
              <div class="col q-gutter-sm">
                <span>{{result.sale.customer.phone + ', ' +result.sale.customer.email}}</span>
              </div>
            </div>
            <div class="row q-gutter-sm q-pt-sm">
              <div class="col q-gutter-sm">
                <strong>អាសយដ្ឋានទី១</strong><br>
                <span>{{result.sale.customer.address1}}</span>
              </div>
              <div class="col q-gutter-sm">
                <strong>អាសយដ្ឋានទី២</strong><br>
                <span>{{result.sale.customer.address2}}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-pt-sm">
      <div class="full-width">
        <q-table
          :data="result.sale.sale_item"
          :columns="columns.column2"
          row-key="name"
          :rows-per-page-options="[0]"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="product_name">
                {{ props.row.product_option.product.title + " (" +props.row.product_option.sku + ")" }}
              </q-td>
              <q-td key="sale_price">
                ${{props.row.product_option.price.toFixed(2)}}
              </q-td>
              <q-td key="sale_qty">
                {{props.row.sale_qty}}
              </q-td>
              <q-td key="total">
                ${{ ((props.row.sale_price ) * ( props.row.sale_qty)).toFixed(2)}}
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
import { sale_one_graphql } from "./view/graphql/sale-one.graphql";

export default {
  name: "Sale.view",
  setup(props: any, context: any){
    const columns = reactive({
      column2: [
        {
          name: 'product_name',
          label: 'ទំនិញ',
          align: 'left',
          sortable: true
        },{
          name: 'sale_price',
          label: 'តម្លៃលក់',
          align: 'left',
          sortable: true
        },{
          name: 'sale_qty',
          label: 'ចំនួនលក់',
          align: 'left',
          sortable: true
        },{
          name: 'total',
          label: 'សរុប',
          align: 'left',
          sortable: true
        },
      ],
    })
    const variables = reactive({
      id: context.root.$route.params.id
    });

    const {result} = useQuery(
      sale_one_graphql,
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
