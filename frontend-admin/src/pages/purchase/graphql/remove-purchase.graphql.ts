import {gql} from '@apollo/client/core';

export const remove_purchase_graphql = gql`
  mutation removePurchase($id: String!) {
    removePurchase(id: $id) {
      success
      message
    }
  }
`;
