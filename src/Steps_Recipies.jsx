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
import LeftArrow from './components/LeftArrow.jsx';
import RightArrow from './components/RightArrow.jsx';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { IconContext } from 'react-icons';
class U_Steps_Recipies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      activeIndex: 0,
      length: this.steps.length
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
    console.log('steps', steps);
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
  isNotLastStep = () => {
    if (this.state.currentStep < this.steps.length - 1) {
      //   return <div onClick={() => this.saveRecipe()}>SAVE</div>;
      // } else {
      return (
        <IconContext.Provider value={{ size: '2em' }}>
          <FaAngleRight className="arrow" onClick={() => this.nextStep(this.state.currentStep)} />
        </IconContext.Provider>
      );
    }
  };
  isLastStep = () => {
    if (this.state.currentStep === this.steps.length - 1) {
      return (
        <div className="saveButton" onClick={() => this.saveRecipe()}>
          SAVE
        </div>
      );
    }
  };
  isFirstStep = () => {
    if (this.state.currentStep > 0) {
      return (
        <IconContext.Provider value={{ size: '2em' }}>
          <FaAngleLeft className="arrow" onClick={() => this.previousStep(this.state.currentStep)} />
        </IconContext.Provider>
      );
    }
  };
  render = () => {
    return (
      <div>
        <div className="slider">
          <div className="slider-items">
            {this.isFirstStep()}
            <div className="slider-text">
              <label htmlFor="#image" className="formHeaderInside">
                {this.props.recipieInProgress.title}
              </label>
              {this.showStep(this.state.currentStep)}
            </div>
            {this.isNotLastStep()}
          </div>
        </div>
        {this.isLastStep()}
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
