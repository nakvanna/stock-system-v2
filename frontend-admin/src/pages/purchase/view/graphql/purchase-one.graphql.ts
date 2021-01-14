import {gql} from '@apollo/client/core';

export const purchase_one_graphql = gql`
  query purchase(
    $id: ID!
  ){
    purchase(id: $id){
      _id
      purchase_date
      purchase_status
      amount
      due_amount
      paid_amount
      description
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
        }
      }
    }
  }
`
