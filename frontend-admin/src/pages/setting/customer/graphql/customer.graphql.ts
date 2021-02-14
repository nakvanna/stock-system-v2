import {gql} from '@apollo/client/core';

export const customer_graphql = gql`
  query customers(
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
          date_of_birth
          phone
          email
          address1
          address2
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
export const filter_customer_graphql = gql`
  query filter_products(
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
          date_of_birth
          phone
          email
          address1
          address2
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
