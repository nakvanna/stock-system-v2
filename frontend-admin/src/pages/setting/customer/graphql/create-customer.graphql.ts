import {gql} from '@apollo/client/core';

export const create_customer_graphql = gql`
  mutation createCustomer($create_input: CreateCustomerInput!
  ) {
    createCustomer(create_input: $create_input) {
      success
      message
    }
  }
`;
