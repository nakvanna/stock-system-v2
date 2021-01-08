import {gql} from '@apollo/client/core';

export const purchase_graphql = gql`
    query purchases(
      $first: Float!
      $after: String!
      $condition: JSON!
    ){
      purchases(options: {first: $first, after: $after, condition: $condition}){
        totalCount
        edges {
          cursor
          node {
            _id
            purchase_status
            purchase_date
            description
            amount
            paid_amount
            due_amount
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
