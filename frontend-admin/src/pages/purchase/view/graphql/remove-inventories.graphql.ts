import {gql} from '@apollo/client/core';

export const remove_inventories_graphql = gql`
  mutation removeInventories($purchase_id: String!) {
    removeInventories(purchase_id: $purchase_id) {
      success
      message
    }
  }
`;
