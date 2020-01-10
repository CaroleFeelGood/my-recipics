import React, { Component } from 'react';
import { connect } from 'react-redux';
import Crop from './Crop.jsx';
class U_Step_ingredients extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  inputChange = event => {
    this.props.dispatch({
      type: 'ingredients',
      content: {
        ingredients: event.target.value
      }
    });
  };

  displayMode = () => {
    // console.log('this.props.show', this.props.show);
    switch (this.props.show) {
      case 'create':
        this.title = 'CHOOSE INGREDIENTS';
        this.crop = <Crop action="ingredients" content="ingredients" />;
        return;
      case 'recap':
        this.title = 'INGREDIENTS';
        this.crop = '';
        return;
      default:
        this.title = 'INGREDIENTS';
        this.crop = '';
        return;
    }
  };

  render = () => {
    this.displayMode();
    return (
      <div className="stepsOCR">
        <div className="steps-title">{this.title}</div>
        <div className="step-title-crop">
          {/* <label htmlFor="#image" className="formHeaderInside">
            {this.props.recipieInProgress.title}
          </label> */}
          {this.crop}
          <textarea className="largeInputCrop" type="text" id="title" value={this.props.recipieInProgress.ingredients} onChange={this.inputChange} />
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
let Step_ingredients = connect(mapStateToProps)(U_Step_ingredients);
export default Step_ingredients;
