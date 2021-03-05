import {gql} from '@apollo/client/core';

export const sale_one_graphql = gql`
  query sale(
    $id: ID!
  ){
    sale(id: $id){
      _id
      sale_date
      sale_status
      amount
      due_amount
      paid_amount
      description
      createdAt
      customer{
        _id
        business_name
        contact_firstname
        contact_lastname
        phone
        email
        address1
        address2
        date_of_birth
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
`
