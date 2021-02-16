import {gql} from '@apollo/client/core';

export const create_inventories_graphql = gql`
  mutation createInventories($create_input: CreateInventoriesInput!
  ) {
    createInventories(create_input: $create_input) {
      success
      message
    }
  }
`;
