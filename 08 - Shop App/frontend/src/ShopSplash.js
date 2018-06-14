//RENDERS SPLASH PAGE FOR SHOP
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ShopSplash extends Component {

  render() {

    return (
      <div className="shopSplashBox">
        <div>
          Choose from our impossibly large catalogue of Shoes and Hats!
        </div>
        <div>
          <Link to="/shop/shoes">
            <img src="/img/cleats.png" alt="" className="shopMenuImg"/>
          </Link>
          <Link to="/shop/hats">
            <img src="/img/hats.png" alt="" className="shopMenuImg"/>
          </Link>
        </div>
      </div>
    )
  }
}
