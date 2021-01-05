import {gql} from '@apollo/client/core';

export const product_graphql = gql`
  query products(
    $first: Float!
    $after: String!
    $condition: JSON!
  ){
    products(options: {first: $first, after: $after, condition: $condition}){
      totalCount
      edges {
        cursor
        node {
          _id
          sub_category_id
          sub_category{
            _id
            name
            category{
              _id
              name
            }
          }
          brand_id
          brand{
            _id
            name
          }
          variant1{
            name
            values
          }
          variant2{
            name
            values
          }
          variant3{
            name
            values
          }
          product_media{
            position
            src
            alt
          }
          product_option{
            _id
            sku
            weight
            price
            image_position
            barcode
            option1
            option2
            option3
            status
          }
          title
          description
          tags
          product_status
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
export const filter_product_graphql = gql`
  query filter_products(
    $first: Float!
    $after: String!
    $condition: JSON!
  ){
    products(options: {first: $first, after: $after, condition: $condition}){
      totalCount
      edges {
        cursor
        node {
          _id
          brand_id
          brand{
            name
          }
          description
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
