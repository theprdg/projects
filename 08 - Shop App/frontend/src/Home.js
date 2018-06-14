import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//PACKAGE THAT HELPS WITH VALIDATING USERNAME INPUT
import validator from 'validator';

export default class Home extends Component {

  getUsername = (e) => {
    e.preventDefault();
    let username = this.refs.username.value;

    //CHECK IF USERNAME IS VALID
    if (!validator.isEmpty(username) &&
      validator.isAlphanumeric(username) &&
      validator.isAlpha(username[0]) &&
      validator.isByteLength(username, { min: 3, max: 20 })) {
      this.props.createUsername(username);
      this.refs.username.value = "";
    }
    else {
      this.refs.username.value = '';
    }
  }

  render() {

    (this.props.username !== '') && this.props.history.push('/shop');

    return (
      <div className="centerBox">
        <div className="loginTitle">Hey there stranger, login!</div>
        <form onSubmit={this.getUsername}>
          <input
            autoFocus="autofocus"
            type="text"
            ref="username"
            placeholder="Enter Username" />
          <button className="loginBtn">>></button>
        </form>
        <p className="loginMsg">No special characters, 3-20 characters, must start with letter.</p>
      </div>
    )
  }
}
