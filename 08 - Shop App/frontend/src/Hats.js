//RENDERS HATS PRODUCT PAGE
import React, { Component } from 'react';

export default class Hats extends Component {

  addCart = (item) => {
    this.props.addItem(item);
  }

  render() {
    let hatsJSX = this.props.hats.map((item, index) => {
      return (
        <div key={Date.now() * index} className="col-xs-12 col-sm-6 product">
          <img src={item.img} alt="" className="img-responsive" />
          <h4>{item.name}</h4>
          <h6>${item.price}</h6>
          <div>
            <button
              className="cartBtn"
              onClick={() => this.addCart(item)}>
              Add to Cart
            </button>
          </div>
        </div>
      )
    })

    return (
      <div className="row grid">
        {hatsJSX}
      </div>
    )
  }
}
