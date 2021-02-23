import {gql} from '@apollo/client/core';

export const purchase_payback_graphql = gql`
  query purchase_paybacks(
    $first: Float!
    $after: String!
    $condition: JSON!
  ){
    purchase_paybacks(options: {first: $first, after: $after, condition: $condition}){
      totalCount
      edges {
        cursor
        node {
          _id
          payback
          payback_date
          note
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
