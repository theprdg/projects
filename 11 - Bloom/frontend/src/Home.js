import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import annyang from 'annyang';

export default class Home extends Component {

  componentDidMount() {
    // ANNYANG VOICE RECOGNITION
    if (annyang) {
      let re = new RegExp(/^.*\//);
      let commands = {
        'next (page)': () => window.location.href = re.exec(window.location.href)[0] + 'about'
      };

      annyang.addCommands(commands);
      annyang.start();
    }
  }

  render() {
    return (
      <div className="homeContainer fadeIn">
        <video loop muted autoPlay
          poster="/assets/img/coffeecup.jpg" className="fullscreen-bg__video"
          src="/assets/vid/coffeecup.mp4">
        </video>
        <div className="titleBox">
          <div className="homeTitle slideInFromLeft">
            bloom.
          </div>
          <div className="subTitle slideInFromLeft">
            Companion for a perfect brew
          </div>
        </div>
        <div className="arrow-box">
          <Link to="/about">
            <img id="arrow" src="./assets/img/arrow.png" alt="" />
          </Link>
        </div>
      </div>
    )
  }
}
