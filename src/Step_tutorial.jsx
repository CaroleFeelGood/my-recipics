import React, { Component } from 'react';

class Step_tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    return (
      <div className="steps">
        <div className="steps-titleTuto">TUTORIAL</div>
        <div className="stepContent">
          <div className="verticalLine"></div>
          <ul className="tuto-ul">
            <li className="tuto-li">
              <div className="number">1</div>
              <div className="tuto-text">Choose category</div>
            </li>
            <li className="tuto-li">
              <div className="number">2</div>
              <div className="tuto-text">Add title</div>
            </li>
            <li className="tuto-li">
              <div className="number">3</div>
              <div className="tuto-text">Add list of ingredients</div>
            </li>
            <li className="tuto-li">
              <div className="number">4</div>
              <div className="tuto-text">Add step description</div>
            </li>
            <li className="tuto-li">
              <div className="number">5</div>
              <div className="tuto-text">Add general informations</div>
            </li>
            <li className="tuto-li">
              <div className="number">6</div>
              <div className="tuto-text">Add picture</div>
            </li>
          </ul>
        </div>
      </div>
    );
  };
}

export default Step_tutorial;
