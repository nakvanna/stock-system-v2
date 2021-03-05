import {gql} from '@apollo/client/core';

export const customer_graphql = gql`
  query filterCustomers(
    $first: Float!
    $after: String!
    $condition: JSON!
  ){
    customers(options: {first: $first, after: $after, condition: $condition}){
      totalCount
      edges {
        cursor
        node {
          _id
          business_name
          contact_firstname
          contact_lastname
          phone
          email
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
