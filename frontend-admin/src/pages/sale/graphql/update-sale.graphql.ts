import {gql} from '@apollo/client/core';

export const update_purchase_graphql =gql`
    mutation updatePurchase($id: String!, $update_input: UpdatePurchaseInput!){
      updatePurchase(id: $id, update_input: $update_input){
        success
        message
      }
    }
`
