import {gql} from '@apollo/client/core';

export const remove_customer_graphql = gql`
  mutation removeCustomer($id: String!) {
    removeCustomer(id: $id) {
      success
      message
    }
  }
`;
