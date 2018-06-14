//RENDERS CART PAGE
import React, { Component } from 'react';

export default class Cart extends Component {

  render() {
    
    //SHOPPING CART TOTAL PRICE
    let cartTotal = this.props.cart.reduce(function(acc,current) {
      acc += current.price;
      return acc;
    }, 0)
    cartTotal = cartTotal.toFixed(2);
    
    //DISPLAY CART ITEMS AND PRICE
    let cartJSX = this.props.cart.map((item, index) => {
      return (
        <div key={Date.now() * index}>
          {item.name} -- ${item.price}
        </div>
      )
    })

    //DISPLAY CART ITEMS AND TOTAL CART PRICE
    let cartItems;
    if (this.props.cart.length === 0) cartItems = 'Empty'
    else cartItems = "(" + this.props.cart.length + ")"

    return (
      <div className="cartBox">
        <h3>Cart {cartItems}</h3>
        <h5><u>Cart Total: ${cartTotal}</u></h5>
        {cartJSX}
      </div>
    )
  }
}
