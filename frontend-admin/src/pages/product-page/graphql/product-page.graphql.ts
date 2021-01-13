import {gql} from '@apollo/client/core';

export const product_sale_view_graphql = gql`
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
          title
          description
          product_status
          tags
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
            _id
            alt
            src
            position
          }
          product_option{
            _id
            price
          }
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

export const product_option_graphql = gql`
  query product_option(
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
          createdAt
          product{
            _id
            title
            description
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
              src
              position
            }
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

export const product_option_one_graphql = gql`
  query product_option(
    $id: ID!
  ){
    product(id: $id){
      _id
      title
      description
      tags
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
        _id
        position
        src
        alt
      }
      product_option{
        _id
        sku
        image_position
        price
        option1
        option2
        option3
        barcode
      }
      createdAt
    }
  }
`
