import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import annyang from 'annyang';

export default class Recipes extends Component {

  constructor() {
    super();
    this.state = {
      isPaused: true, //TIMER PAUSE STATUS
      timer: '', //TIME COMPONENT ASSOCIATED WITH STEP
    }
  }

  componentDidMount() {
    let stepPath = this.props.match.params.step, //GET RECIPE STEP FROM URL
      time = '';
    this.props.recipes.map((recipe, index) => {
      if (recipe._id === this.props.match.params.recipe &&
        stepPath > 0 &&
        stepPath < recipe.recipe.length) {
        if (recipe.recipe[stepPath - 1].time !== 0)
          time = recipe.recipe[stepPath - 1].time
        this.setState({
          isPaused: true,
          timer: time
        })
      }
    });

    // ANNYANG VOICE RECOGNITION
    if (annyang) {
      let re = new RegExp(/^.*\//),
        pathNext = (Number(this.props.match.params.step) + 1).toString(),
        pathPrev = (Number(this.props.match.params.step) - 1).toString()

      let commands = {
        'next (step)': () => window.location.href =
          re.exec(window.location.href)[0] + pathNext,
        'previous (step)': () => window.location.href =
          re.exec(window.location.href)[0] + pathPrev,
        'start (timer)': () => this.playPause(this.state.timer),
        'pause (timer)': () => this.playPause(this.state.timer),
        'return': () => window.location.href =
          re.exec(window.location.href)[0] + 'methods'
      };

      annyang.addCommands(commands);
      annyang.start();
    }
  }

  //SET TIMER FOR GIVEN STEP
  setTimer = (t) => {
    clearInterval(this.state.interval);
    let timer;
    t === 0 ? timer = '' : timer = t;
    this.setState({
      isPaused: true,
      timer: timer
    })
  }

  //START/STOP TIMER
  playPause = (t) => {
    if (this.state.isPaused) {
      let interval = setInterval(this.timer, 1000);
      this.setState({
        interval: interval,
        isPaused: false
      });
    }
    else {
      clearInterval(this.state.interval);
      this.setState({
        isPaused: true
      })
    }
  }

  //DECREMENT TIMER 
  timer = () => {
    let newTime = this.state.timer - 1;

    //DECREMENT WHILE NOT ZERO
    if (newTime >= 0) {
      this.setState({
        timer: newTime
      });
    } else { //PAUSE TIMER IF ZERO
      clearInterval(this.state.interval);
    }
  }

  //CONVERT SECONDS TO MM:SS FORMAT
  timeConvert = (time) => {
    if (time !== '')
      return Math.floor(time / 60) + ":" + ("0" + time % 60).slice(-2);
  }

  render() {
    //URL STEP NUMBER
    let stepPath = this.props.match.params.step, 

      //CATCH INVALID MANUAL URL INPUT FOR RECIPE
      recipeExists = false, 

      //DUE TO <LINK>'S NOT RENDERING ON LOAD (NEED TO FIGURE THIS
      //OUT STILL), NEED TO GET PREVIOUS AND NEXT STEP'S 
      //TIMER TIME WHERE AVAILABLE
      currentStepTime = 0, 
      nextStepTime = 0,
      prevStepTime = 0,

      //NUMBER OF STEPS IN RECIPE
      numSteps = 0,

      //GATHER SELECTED RECIPE'S STEPS
      thisRecipe = [],

      //NAME OF RECIPE
      recipeName = '',

      //CURRENT STEP
      step,

      //INFO ABOUT THE ASSOCIATED BREW METHOD OF THE SELECTED RECIPE
      methodData,
      stepJSX;

    //MATCH SELECTED RECIPE WITH DATABASE AND GET RECIPE DATA
    this.props.recipes.map((recipe, index) => {
      if (recipe._id === this.props.match.params.recipe &&
        stepPath >= 0 &&
        stepPath <= recipe.recipe.length) {
        recipeExists = true;
        recipeName = recipe.recipeName;
        thisRecipe = recipe.recipe;
        numSteps = thisRecipe.length;

        //STEP 0 IS JUST AN OVERVIEW OF THE RECIPE, THEREFORE
        //STEP 1 IS ACTUALLY THE FIRST (ZEROTH) OBJECT IN THE 
        //RECIPE ARRAY
        step = thisRecipe[Number(stepPath) - 1];

        //THIS WASN'T THE MOST EFFICIENT WAY OF DOING THIS
        //BUT IT WORKS!
        this.props.brewMethods.map((method, index) => {
          if (method._id === recipe.brewMethod_id)
            methodData = method;
        })

        //OVERVIEW OF RECIPE
        if (Number(stepPath) === 0) {
          nextStepTime = thisRecipe[Number(stepPath)].time;
          let apparatus = methodData.basicApparatus.map((item, index) => {
            return (
              <li key={Date.now() * index}>
                <h5>{item}</h5>
              </li>
            )
          })
          stepJSX =
            <div className="recipeOverview fadeIn">
              <h3>
                Brew Time: {this.timeConvert(recipe.brewTime)}
              </h3>
              <h5 className="overviewText">
                {recipe.overview}
              </h5>
              <h5>
                <strong>Things you need:</strong>
              </h5>
              <ul className="itemsList">
                {apparatus}
              </ul>
            </div>
        }

        //STEPS OF RECIPE
        else {
          currentStepTime = thisRecipe[Number(stepPath) - 1].time;

          if (Number(stepPath) === 1) {
            prevStepTime = 0;
            nextStepTime = thisRecipe[Number(stepPath)].time
          }
          else if (Number(stepPath) === numSteps) {
            prevStepTime = recipe.recipe[Number(stepPath) - 2].time;
            nextStepTime = 0;
          }
          else {
            prevStepTime = recipe.recipe[Number(stepPath) - 2].time;
            nextStepTime = recipe.recipe[Number(stepPath)].time;
          }

          stepJSX =
            <div className="fadeIn">
              <h1>Step {stepPath}</h1>
              <p></p>
              <h3><strong>{step.step_title}</strong></h3>
              <h5 className="stepInstr">
                {step.instruction}
              </h5>
            </div>
        }
      }
    })

    if (!recipeExists)
      return <Redirect to="/methods" />

    return (
      <div className="stepsBox">
        <div className="stepLeftBox">
          <div className="stepRecipeName fadeIn">
            {methodData.name}, {recipeName}
          </div>

          {stepJSX}

          <div className="stepBtn fadeIn">
            {/* PREVIOUS STEP BUTTON */}
            <Link
              to={`/${this.props.match.params.recipe}/${Number(stepPath) - 1}`}>
              <button
                className={Number(stepPath) === 0 ? "prevBtn hidden" : "prevBtn"}
                onClick={() => this.setTimer(prevStepTime)}>
                Prev
              </button>
            </Link>

            {/* START/PAUSE TIMER BUTTON */}
            <button
              onClick={() => this.playPause(this.state.timer)}
              className={
                currentStepTime === 0 ||
                  currentStepTime === undefined ? "playBtn hidden" : "playBtn"}>
              {this.state.isPaused ? "Start" : "Pause"}
            </button>

            {/* NEXT STEP BUTTON */}
            <Link
              to={`/${this.props.match.params.recipe}/${Number(stepPath) + 1}`}>
              <button
                className={Number(stepPath) === numSteps ? "nextBtn hidden" : "nextBtn"}
                onClick={() => this.setTimer(nextStepTime)}>
                Next
              </button>
            </Link>
          </div>
        </div>
        <div className="stepRightBox">

          {/* BLINK IF TIMER HITS ZERO */}
          <div className={this.state.timer === 0 ?
            "stepTimer blink" : "stepTimer"}>
            {this.timeConvert(this.state.timer)}
          </div>
        </div>

        {/* RETURN TO METHODS PAGE */}
        <div className="stepBackBtn">
          <Link to="/methods">
            <img className="leftArrow" src="/assets/img/leftarrow.svg" alt="" />
          </Link>
        </div>
      </div>
    )
  }
}
