import React, { Component } from 'react';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import ShopSplash from './ShopSplash';
import Shoes from './Shoes';
import Hats from './Hats';
import Cart from './Cart';
import Error from './Error';
import axios from 'axios';

export default class Shop extends Component {

  constructor() {
    super();
    this.state = {
      shoes: [],
      hats: [],
      cart: [],
      hide: ""
    };
  }

  //ADD ITEM FROM 'ADD TO CART' TO SERVER AND STATE
  addItem = (item) => {
    let cart = Array.from(this.state.cart);
    cart.push(item);
    axios.post('http://localhost:8080/cart', item)
      .then(response => {
        console.log('New item added to cart');
      })
      .catch(error => {
        console.log(error);
      })
    this.setState({
      cart: cart
    })
  }

  //CLEARS CART AND LOCALSTORAGE FROM USER LOGOUT
  logout = () => {
    axios.post('http://localhost:8080/clearCart')
      .then(respond => {
        console.log('Cart cleared');
        localStorage.setItem('username','');
        this.props.logoutUser();
      })
      .catch(error => {
        console.log(error);
      })
    this.setState({
      cart: []
    })
  }

  //RETRIEVE SERVER DATA
  componentDidUpdate() {
    axios.get('http://localhost:8080/data')
      .then(response => {
        console.log(response.data)
        this.setState(
          response.data
        )
        console.log('Server data retrieved')
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    // console.log('user', localStorage.getItem('username'));
    // console.log('shop',this.props.username)
    if (this.props.username === '') {
      console.log('shop',this.props.username)
      this.logout();
      // return <Redirect to="/" />
    }

    return (
      <div>
        <div>
          <Link to="/shop/shoes">
            <div className="subMenu">Shoes</div>
          </Link>
          <Link to="/shop/hats">
            <div className="subMenu">Hats</div>
          </Link>
          <Link to="/shop/cart">
            <div className="subMenu">
              Cart ({this.state.cart.length})
            </div>
          </Link>
        </div>
        <div className="shopBox">
          <Switch>
            <Route exact path="/shop"
              component={ShopSplash} />
            <Route path={this.props.match + "/shoes"}
              render={(props) => {
                return <Shoes
                  shoes={this.state.shoes}
                  addItem={this.addItem} />
              }} />
            <Route path={this.props.match + "/hats"}
              render={(props) => {
                return <Hats
                  hats={this.state.hats}
                  addItem={this.addItem} />
              }} />
            <Route path={this.props.match + "/cart"}
              render={(props) => {
                return <Cart cart={this.state.cart} />
              }} />

            {/* CAPTURE INVALID URL PATH */}
            <Route path={this.props.match + "/*"}component={Error} />
          </Switch>
        </div>
        <div className="footer">
          <div className="welcomeMsg">
            Welcome {this.props.username}! Shop Away!
            <Link to="/">
              <span
                className="logout"
                onClick={() => { this.logout() }}
              >Logout
              </span>
            </Link>
          </div>
        </div>
      </div >
    )
  }
}
