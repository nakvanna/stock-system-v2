import {gql} from '@apollo/client/core';

export const create_purchase_graphql = gql`
  mutation createSale($create_input: CreatePurchaseInput!
  ) {
    createPurchase(create_input: $create_input) {
      success
      message
    }
  }
`;
