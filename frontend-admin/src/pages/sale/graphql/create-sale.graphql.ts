import {gql} from '@apollo/client/core';

export const create_sale_graphql = gql`
  mutation createSale($create_input: CreateSaleInput!
  ) {
    createSale(create_input: $create_input) {
      success
      message
    }
  }
`;
