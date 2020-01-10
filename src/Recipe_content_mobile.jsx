import React, { Component } from 'react';

class Recipe_content_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientOn: true,
      stepsOn: false
    };
  }
  onIngredientClick = () => {
    this.setState({
      ingredientOn: true,
      stepsOn: false
    });
  };
  onStepsClick = () => {
    this.setState({
      ingredientOn: false,
      stepsOn: true
    });
  };
  content = () => {
    if (this.state.ingredientOn) return this.props.recipe.ingredients;
    else return this.props.recipe.todo;
  };
  render = () => {
    return (
      <div className="mobile-version">
        <div className="button-content-container">
          <button
            onClick={this.onIngredientClick}
            className="button-content"
            style={{
              borderBottom: this.state.ingredientOn ? 'none' : '1px solid #606060',
              backgroundColor: this.state.ingredientOn ? 'white' : '#F6F6F6'
            }}
          >
            INGRÉDIENTS
          </button>
          <button
            onClick={this.onStepsClick}
            className="button-content tabsContent-right"
            style={{ borderBottom: this.state.stepsOn ? 'none' : '1px solid #606060', backgroundColor: this.state.stepsOn ? 'white' : '#F6F6F6' }}
          >
            PRÉPARATION
          </button>
        </div>
        <div id="ingredients">
          {/* {console.log('this.state.recipe.ingredients', this.state.recipe.ingredients)} */}
          <div className="tabsContent">{this.content()}</div>
        </div>
      </div>
    );
  };
}

export default Recipe_content_mobile;
