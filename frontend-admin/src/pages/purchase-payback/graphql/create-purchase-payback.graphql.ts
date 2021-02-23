import {gql} from '@apollo/client/core';

export const create_purchase_payback_graphql = gql`
  mutation createPurchasePayback($create_input: CreatePurchasePaybackInput!
  ) {
    createPurchasePayback(create_input: $create_input) {
      success
      message
    }
  }
`;
