//AHHHHHH I MISS YOU GUYS ALREADY!!
//THANKS FOR EVERYTHING, YOU'RE TOO AWESOME 
//SO LET'S BE SURE TO HANG OUT SOMETIME
//MMMMKAY?

//ALSO... SOOOOO TIRED FROM LACK OF COFFEEEEEEE

import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Methods from './Methods';
import Recipes from './Recipes';
import About from './About';
import annyang from 'annyang';

class App extends Component {

  constructor() {
    super();
    this.state = {
      brewMethods: [], //ARRAY OF BREW METHODS
      recipes: [], //ARRAY OF RECIPES
      dataRetrieved: false //FLAG FOR RETRIEVAL OF DATA FROM THE DATABASE
    }
  }

  componentDidMount() {

    //GET BREWMETHODS AND RECIPES DATA
    axios.get('http://localhost:8080/method')
      .then(response => {
        this.setState({
          brewMethods: response.data
        })
        console.log('Brew methods retrieved')
      })
      .then(() => {
        axios.get('http://localhost:8080/recipe')
          .then(response => {
            this.setState({
              recipes: response.data,
              dataRetrieved: true
            })
            console.log('Recipes retrieved')
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(error => {
        console.log(error);
      })

    // ANNYANG VOICE RECOGNITION FOR SITE NAVIGATION
    if (annyang) {
      let re = new RegExp(/^.*\//); //REGULAR EXPRESSION FOR URL MATCHING
      let commands = {
        '(go to) home (page)': () => window.location.href =
        re.exec(window.location.href)[0],
        '(go to) about (page)': () => window.location.href = re.exec(window.location.href)[0] + 'about',
        '(go to) methods (page)': () => window.location.href = re.exec(window.location.href)[0] + 'methods',
      };

      //ADD COMMANDS TO ANNYANG
      annyang.addCommands(commands);

      //START LISTENING FOR VOICE INPUT
      annyang.start();
    }
  }

  render() {
    if (this.state.dataRetrieved) { //RENDER WHEN DATA RETRIEVED
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/methods" render={(props) => {
              return <Methods
                brewMethods={this.state.brewMethods}
                recipes={this.state.recipes}
                match={props.match} />
            }} />
            <Route path="/about" component={About} />
            <Route path="/:recipe/:step" render={(props) => {
              return <Recipes
                brewMethods={this.state.brewMethods}
                recipes={this.state.recipes}
                match={props.match} />
            }} />
            <Route path="/*" render={() => {
              return <Redirect to="/methods" />
            }} />
          </Switch>
        </BrowserRouter>
      );
    }
    return (
      <div>Brewing...</div> //MESSAGE WHILE WAITING FOR DATA RETRIEVAL
    )
  }
}

export default App;
