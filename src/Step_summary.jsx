import React, { Component } from 'react';
import { connect } from 'react-redux';
import Step_categories from './Step_categories.jsx';
import Step_title from './Step_title.jsx';
import Step_ingredients from './Step_ingredients.jsx';
import Step_todo from './Step_todo.jsx';
import Step_general from './Step_general.jsx';
import Step_picture from './Step_picture.jsx';
class U_Step_summary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render = () => {
    return (
      <div className="recipe">
        <Step_categories show="recap" />
        <Step_title show="recap" />
        <Step_ingredients show="recap" />
        <Step_todo show="recap" />
        <Step_general show="recap" />
        <Step_picture show="recap" />
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    recipieInProgress: state.recipieToAdd
  };
};
let Step_summary = connect(mapStateToProps)(U_Step_summary);
export default Step_summary;
