import {gql} from '@apollo/client/core';

export const supplier_graphql = gql`
  query filterSuppliers(
    $first: Float!
    $after: String!
    $condition: JSON!
  ){
    suppliers(options: {first: $first, after: $after, condition: $condition}){
      totalCount
      edges {
        cursor
        node {
          _id
          name
          company
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
