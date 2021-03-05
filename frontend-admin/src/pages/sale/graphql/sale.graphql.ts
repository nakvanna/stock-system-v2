import {gql} from '@apollo/client/core';

export const sale_graphql = gql`
  query sales(
    $first: Float!
    $after: String!
    $condition: JSON!
  ){
    sales(options: {first: $first, after: $after, condition: $condition}){
      totalCount
      edges {
        cursor
        node {
          _id
          sale_status
          sale_date
          description
          amount
          paid_amount
          due_amount
          createdAt
          customer{
            _id
            business_name
            contact_firstname
            contact_lastname
            date_of_birth
            email
            phone
            address1
            address2
          }
          sale_item{
            _id
            sale_status
            sale_qty
            sale_price
            tax
            discount
            product_option{
              _id
              sku
              weight
              weight_unit
              price
              barcode
              image_position
              option1
              option2
              option3
              product{
                _id
                title
                description
                product_media{
                  _id
                  src
                  position
                }
              }
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
