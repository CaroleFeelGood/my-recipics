import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Step_tutorial from './Step_tutorial.jsx';
import Step_categories from './Step_categories.jsx';
import Step_title from './Step_title.jsx';
import Step_ingredients from './Step_ingredients.jsx';
import Step_todo from './Step_todo.jsx';
import Step_general from './Step_general.jsx';
import Step_picture from './Step_picture.jsx';
import Step_summary from './Step_summary.jsx';
class U_Steps_Recipies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0
    };
  }
  steps = [
    <Step_tutorial />,
    <Step_categories show="create" />,
    <Step_title show="create" />,
    <Step_ingredients show="create" />,
    <Step_todo show="create" />,
    <Step_general show="create" />,
    <Step_picture show="create" />,
    <Step_summary />
  ];

  previousStep = step => {
    if (step > 0) this.setState({ currentStep: this.state.currentStep - 1 });
  };
  nextStep = step => {
    if (step < this.steps.length) this.setState({ currentStep: this.state.currentStep + 1 });
  };
  showStep = steps => {
    return this.steps[steps];
  };
  saveRecipe = async () => {
    console.log('save recipe');
    // event.preventDefault();
    // var FlashMessage = require('./FlashMessage.jsx');
    let data = new FormData();
    data.append('recipe', JSON.stringify(this.props.recipieInProgress));
    data.append('img', this.props.recipieInProgress.img);
    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    let response = JSON.parse(await (await fetch('/newRecipe', { method: 'post', body: data })).text());
    console.log('response', response);
    if (response.success) {
      console.log('before redirect');
      this.props.dispatch({
        type: 'init-recipe'
        // content: {
        //   todo: event.target.value
        // }
      });
      // <FlashMessage messageHeader="Bravo!" messageBody="Your recipe is added!" type="Sucess" autoDismiss={true} timeout={300} hidden={false} />;
      this.props.history.push('/');
    } else {
      // <FlashMessage messageHeader="Oups!" messageBody="Somethings wrongs!" type="Danger" autoDismiss={true} timeout={300} hidden={false} />;
      alert('New recipe FAILED.');
    }
  };
  isLastStep = () => {
    if (this.state.currentStep === this.steps.length - 1) {
      return <div onClick={() => this.saveRecipe()}>SAVE</div>;
    } else {
      return <div onClick={() => this.nextStep(this.state.currentStep)}>NEXT</div>;
    }
  };
  isFirstStep = () => {
    if (this.state.currentStep > 0) {
      return <div onClick={() => this.previousStep(this.state.currentStep)}>PREVIOUS</div>;
    } else {
      return <div></div>;
    }
  };
  render = () => {
    return (
      <div className="pageAdd">
        <label htmlFor="#image" className="formHeaderInside">
          {this.props.recipieInProgress.title}
        </label>
        {this.showStep(this.state.currentStep)}
        <div className="netxPrev">
          {this.isFirstStep()}
          {this.isLastStep()}
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
let Steps_Recipies = connect(mapStateToProps)(withRouter(U_Steps_Recipies));
export default Steps_Recipies;
