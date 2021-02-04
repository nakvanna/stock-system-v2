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
            supplier{
              _id
              name
              company
              phone
              email
              address
              note
            }
            inventory{
              _id
              purchase_status
              stock_qty
              purchase_qty
              buy_price
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
