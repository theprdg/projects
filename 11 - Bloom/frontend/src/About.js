import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import annyang from 'annyang';

export default class About extends Component {

  componentDidMount() {
    // ANNYANG VOICE RECOGNITION
    if (annyang) {
      let re = new RegExp(/^.*\//);
      let commands = {
        'previous (page)': () => window.location.href = re.exec(window.location.href)[0],
        'next (page)': () => window.location.href = re.exec(window.location.href)[0] + 'methods'
      };

      annyang.addCommands(commands);
      annyang.start();
    }
  }

  render() {
    return (
      <div className="aboutContainer fadeIn">
        <div className="summary slideInFromBot">
          <div className="aboutTitle">Pour-over Pro</div>
          <div>
            Brewing a good cup of coffee isn't rocket science. 
            It's some form of science but you shouldn't have 
            to figure it out. Choose from our list of popular 
            pour-over brewing methods and recipes, and we'll 
            walk you through to an exquisite brew!
          </div>
          <div>&nbsp;</div>
          <div>Click below to begin your journey.</div>
          <div className="arrow-box about-arrow">
            <Link to="/methods">
              <img id="arrow" className="smArrow" src="./assets/img/arrowblack.png" alt="" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
