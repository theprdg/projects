import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import MethodBox from './MethodBox';
import SubmitModal from './SubmitModal';
import annyang from 'annyang';

export default class Methods extends Component {

  constructor() {
    super();
    this.state = {
      index: 0, //INDEX OF SELECTED METHOD
      recipes: [] //RECIPES OF SELECTED BREW METHOD
    }
  }

  componentDidMount() {

    // ANNYANG VOICE RECOGNITION
    let re = new RegExp(/^.*\//);
    if (annyang) {
      let commands = {
        'next': () => this.method(1),
        'previous': () => this.method(-1),
        'chemex': () => {
          this.setState({
            index: 0
          })
        },
        'v60': () => {
          this.setState({
            index: 1
          })
        },
        'aeropress': () => {
          this.setState({
            index: 2
          })
        },
        'french press': () => {
          this.setState({
            index: 3
          })
        },
        'previous page': () => window.location.href = re.exec(window.location.href)[0] + 'about'
      };

      annyang.addCommands(commands);
      annyang.start();
    }
  }

  //CYCLE THROUGH LIST OF BREW METHODS
  method = (i) => {
    let index = this.state.index;
    if (index + i < 0)
      index = this.props.brewMethods.length - 1;
    else if (index + i > this.props.brewMethods.length - 1)
      index = 0;
    else
      index += i;
    this.setState({
      index: index
    })
  }

  //CONVERT TIME FROM SECONDS TO MM:SS FORMAT
  timeConvert = (time) => {
    return Math.floor(time / 60) + ":" + ("0" + time % 60).slice(-2);
  }

  render() {

    //GENERATES LIST OF RECIPES FOR SELECTED BREW METHOD
    let recipeJSX = this.props.recipes.map((recipe, index) => 
    {
      if (recipe.brewMethod_id === this.props.brewMethods[this.state.index]._id) {
        return (
          <div key={Date.now() * index}
            className="col-xs-12 col-sm-6 col-lg-3 recCont fadeIn">
            <div className="recipe">
              <Link className="recipeLink" to={`/${recipe._id}/0`}>
                <div className="recipeName">
                  {recipe.recipeName}
                </div>
                <div className="brewTime">
                  Brew Time: {this.timeConvert(recipe.brewTime)}
                </div>
                <div className="details">Servings: {recipe.servingSize}</div>
                <div className="details">Coffee: {recipe.coffeeWeight} g</div>
                <div className="details">Coarseness: {recipe.coarseness}</div>
                <div className="details">Water: {recipe.waterVol} mL</div>
                <div className="details">Temperature: {recipe.temperature} °F</div>
              </Link>
            </div>
          </div>
        )
      }
    })

    return (
      <div className="methodContainer">

        {/* TOP HALF OF VIEWPORT (BREW METHODS)*/}
        {/* TRIED TO BREAK THIS OUT INTO ITS OWN COMPONENT.
        RAN INTO ERRORS, TO BE MODIFIED IN THE FUTURE */}
        <div className="methodBox fadeIn">

          {/* METHOD SELECTION (LEFT HALF) */}
          <div className="imgBox">
            <div className="leftArrow" onClick={() => this.method(-1)}>
              <img src="/assets/img/leftarrow.svg" alt="" />
            </div>
            <div className="methImgBox slideInFromTop">
              <img
                className="methImg" alt=""
                src={this.props.brewMethods[this.state.index].img} />
            </div>
            <div className="rightArrow" onClick={() => this.method(1)}>
              <img src="/assets/img/rightarrow.svg" alt="" />
            </div>
          </div>

          {/* METHOD DESCRIPTION (RIGHT HALF) */}
          <div className="descBox slideInFromRight">
            <div className="methName">
              {this.props.brewMethods[this.state.index].name}
            </div>
            <div className="methDesc">
              {this.props.brewMethods[this.state.index].description}
            </div>
          </div>
        </div>

        {/* RECIPES TAB */}
        <div className="recipesTab fadeIn">
          Recipes
        </div>

        {/* MENU TABS */}
        <div className="menuTabBox fadeIn">
          <Link className="menuTab" data-toggle="modal"
            data-target="#submitModal" to="">
            <div className="">
              Submit
            </div>
          </Link>
          <Link className="menuTab" to="/about">
            <div className="">
              About
            </div>
          </Link>
        </div>

        {/* BOTTOM HALF OF VIEWPORT (RECIPES)*/}
        <div className="recipeBox fadeIn">
          <div className="row recipeSlideFromBot">
            {recipeJSX}
          </div>
        </div>

        {/* SUBMIT MODAL */}
        <SubmitModal />

      </div>
    )
  }
}