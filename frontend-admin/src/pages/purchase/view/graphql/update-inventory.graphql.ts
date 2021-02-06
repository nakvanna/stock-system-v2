import {gql} from '@apollo/client/core';

export const update_inventory_purchase_status_graphql =gql`
    mutation updateInventoryPurchaseStatus($purchase_id: String!, $update_input: UpdateInventoryInput!){
      updateInventoryPurchaseStatus(purchase_id: $purchase_id, update_input: $update_input){
        success
        message
      }
    }
`
