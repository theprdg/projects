import React, { Component } from 'react';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';
import Error from './Error';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      username: ''
    }
  }

  createUsername = (username) => {
    this.setState({
      username: username
    })
    localStorage.setItem('username', username);
  }

  componentDidMount() {
    let getUsername = localStorage.getItem('username');
    this.setState({
      username: getUsername
    })
  }

  logoutUser = () => {
    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div className="App">

        <nav className="navbar">
          <div className="title">
            H<span className="and">&</span>S.
          </div>
          <div className="menu">
            <Link to="/"><div>Home</div></Link>
            <Link to="/shop"><div>Shop</div></Link>
          </div>
        </nav>

        <Switch>
          <Route
            exact path="/"
            render={(props) => {
              return <Home
                history={props.history}
                createUsername={this.createUsername}
                username={this.state.username} />
            }} />
          <Route
            path="/shop"
            render={(props) => {
              return (this.state.username !== '') ?
                <Shop
                  match={props.match.url}
                  username={this.state.username}
                  logoutUser={this.logoutUser} />
                :
                <Redirect to="/" />
            }} />

          {/* CAPTURE INVALID URL PATH */}
          <Route path="/*" component={Error} />
        </Switch>

      </div>
    );
  }
}

export default App;
