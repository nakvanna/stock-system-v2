import {gql} from '@apollo/client/core';

export const product_option_graphql = gql`
  query productOptions(
    $first: Float!
    $after: String!
    $condition: JSON!
  ){
    product_options(options: {first: $first, after: $after, condition: $condition}){
      totalCount
      edges {
        cursor
        node {
          _id
          sku
          price
          barcode
          image_position
          option1
          option2
          option3
          weight
          weight_unit
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

export const filter_product_option_graphql = gql`
  query filter_product_options(
    $first: Float!
    $after: String!
    $condition: JSON!
  ){
    product_options(options: {first: $first, after: $after, condition: $condition}){
      totalCount
      edges {
        cursor
        node {
          _id
          sku
          price
          option1
          option2
          option3
          createdAt
          product{
            _id
            title
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
