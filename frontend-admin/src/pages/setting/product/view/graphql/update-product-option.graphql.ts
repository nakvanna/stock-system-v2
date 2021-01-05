import {gql} from '@apollo/client/core';

export const update_product_option_graphql =gql`
  mutation updateProductOption($id: String!, $update_input: UpdateProductOptionInput!){
    updateProductOption(id: $id, update_input: $update_input){
      success
      message
    }
  }
`
