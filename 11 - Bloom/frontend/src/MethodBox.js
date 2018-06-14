import React, { Component } from 'react';

export default class MethodBox extends Component {


  render() {
    return (
      <div className="methodBox">

        {/* METHOD SELECTION (LEFT SIDE) */}
        <div className="imgBox">
          <div className="leftArrow" onClick={() => this.method(-1)}>
            <img src="/assets/img/leftarrow.svg" alt="" />
          </div>
          <div className="methImgBox">
            <img
              className="methImg" alt=""
              src={this.props.brewMethods[this.props.index].img} />
          </div>
          <div className="rightArrow" onClick={() => this.method(1)}>
            <img src="/assets/img/rightarrow.svg" alt="" />
          </div>
        </div>

        {/* METHOD DESCRIPTION (RIGHT HALF) */}
        <div className="descBox">
          <div className="methName">
            {this.props.brewMethods[this.props.index].name}
          </div>
          <div className="methDesc">
            {this.props.brewMethods[this.props.index].description}
          </div>
        </div>
      </div>
    )
  }
}
