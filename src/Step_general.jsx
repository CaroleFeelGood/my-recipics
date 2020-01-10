import React, { Component } from 'react';
import { connect } from 'react-redux';
// Font Awesome
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { GiCookingPot, GiSpoon } from 'react-icons/gi';
import { FaUserFriends, FaUtensilSpoon } from 'react-icons/fa';
import { IoMdPricetags } from 'react-icons/io';

import Tags from './Tags.jsx';
class U_Step_general extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  favoriteChange = () => {
    this.props.dispatch({
      type: 'favorite',
      content: {
        favorite: !this.props.recipieInProgress.favorite
      }
    });
  };

  inputChange = event => {
    this.props.dispatch({
      type: event.target.id,
      content: {
        [event.target.id]: event.target.value
      }
    });
  };

  render = () => {
    let favoriteBtnImg = <MdFavoriteBorder />; // SVG
    if (this.props.recipieInProgress.favorite) {
      favoriteBtnImg = <MdFavorite />; // text
    }
    return (
      <div className="stepsGEN">
        <div className="steps-title">GENERALS CARACTERITICS</div>
        <div className="step-title-crop">
          <div className="step_general">
            <div className="generalchoose">
              <label className="generalCHooseColLeft" htmlFor="cookingTime">
                <GiCookingPot />
                <div className="generalCHooselabel">Cooking Time</div>
              </label>
              <input
                type="time"
                id="cookingTime"
                min="00:00"
                value={this.props.recipieInProgress.cookingTime}
                onChange={this.inputChange}
                className="generalCHooseColright"
              />
            </div>
            <div className="generalchoose">
              <label className="generalCHooseColLeft" htmlFor="preparationTime">
                <FaUtensilSpoon />
                <div className="generalCHooselabel">Preparation time</div>
              </label>
              <input
                type="time"
                id="preparationTime"
                min="00:00"
                value={this.props.recipieInProgress.preparationTime}
                onChange={this.inputChange}
                className="generalCHooseColright"
              />
            </div>
            <div className="generalchoose">
              <label className="generalCHooseColLeft" htmlFor="nbPerson">
                <FaUserFriends />
                <div className="generalCHooselabel">Serving</div>
              </label>
              <input
                type="number"
                id="nbPerson"
                value={this.props.recipieInProgress.nbPerson}
                onChange={this.inputChange}
                className="generalCHooseColrightNumber"
              />
            </div>
            <div className="generalchoose">
              <label className="generalCHooseColLeft" htmlFor="tags">
                <IoMdPricetags />
                <div className="generalCHooselabel">Tags</div>
              </label>
              <Tags className="" />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    recipieInProgress: state.recipieToAdd
  };
};
let Step_general = connect(mapStateToProps)(U_Step_general);
export default Step_general;
