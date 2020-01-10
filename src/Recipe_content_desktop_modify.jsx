import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

class Recipe_content_desktop_modify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    return (
      <div className="desktop-version">
        <div className="recette_ingredients">
          <h2 className="recette_title">INGRÉDIENTS</h2>
          <TextareaAutosize className="tabsContent" value={this.props.recipe.ingredients} onChange={this.props.setValueIng}></TextareaAutosize>
        </div>
        <div className="recette_preparation">
          <h2 className="recette_title">PRÉPARATION</h2>
          <TextareaAutosize className="tabsContent" value={this.props.recipe.todo} onChange={this.props.setValueSteps}></TextareaAutosize>
        </div>
      </div>
    );
  };
}

export default Recipe_content_desktop_modify;
