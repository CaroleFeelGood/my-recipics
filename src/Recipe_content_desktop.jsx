import React, { Component } from 'react';

class Recipe_content_desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render = () => {
    return (
      <div className="desktop-version">
        <div className="recette_ingredients">
          <h2 className="recette_title">INGRÉDIENTS</h2>
          <div className="tabsContent">{this.props.recipe.ingredients}</div>
        </div>
        <div className="recette_preparation">
          <h2 className="recette_title">PRÉPARATION</h2>
          <div className="tabsContent">{this.props.recipe.todo}</div>
        </div>
      </div>
    );
  };
}

export default Recipe_content_desktop;
