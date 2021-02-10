import {gql} from '@apollo/client/core';

export const update_customer_graphql =gql`
    mutation updateCustomer($id: String!, $update_input: UpdateCustomerInput!){
      updateCustomer(id: $id, update_input: $update_input){
        success
        message
      }
    }
`
