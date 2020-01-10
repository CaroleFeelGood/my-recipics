import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
// Font Awesome
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { GiCookingPot, GiSpoon } from 'react-icons/gi';
import { FaUserFriends, FaUtensilSpoon } from 'react-icons/fa';

import Recipe_content_mobile from './Recipe_content_mobile.jsx';
import Recipe_content_desktop from './Recipe_content_desktop.jsx';
// import Recipe_details_modify from './Recipe_details_modify.jsx';
class Recipe_details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {}
    };
  }

  getPicture = () => {
    if (this.state.recipe.frontendPath === '') {
      switch (this.state.recipe.category) {
        case 'entrees':
          return '/images/menuEntrees.jpg';
        case 'apero':
          return '/images/menuApero.jpg';
        case 'desserts':
          return '/images/menuDesserts.jpg';
        case 'plats':
          return '/images/menuplats.jpg';
        default:
          return '/images/mesRecettes.jpg';
      }
    } else return this.state.recipe.frontendPath;
  };
  onChangeFavorites = () => {
    let data = new FormData();
    data.append('recipe_id', this.state.recipe._id);
    data.append('favorite', !this.state.recipe.favorite);
    // for (var pair of data.entries()) {
    //   console.log('informData' + pair[0] + ', ' + pair[1]);
    // }
    fetch('/changefavoriterecipe', { method: 'post', body: data })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...', response.error);
        }
      })
      .then(data => {
        this.setState({ recipe: data.recipe });
      })
      // .then(() => {
      //   if (this.props.menu === 'favoris') this.props.loadRecipies(this.props.menu);
      // })
      .catch(error => this.setState({ error }));
  };
  loadRecipe = async id => {
    let getRecipe = async id => {
      fetch('/getrecipe/' + id)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...', response.error);
          }
        })
        .then(data => this.setState({ recipe: data.recipe }))
        .catch(error => this.setState({ error }));
    };
    await getRecipe(id);
  };
  componentDidMount = async () => {
    this.loadRecipe(this.props.id);
  };

  render = () => {
    console.log('this.state.recipe.title', this.state.recipe.title);
    let favoriteBtnImg = <MdFavoriteBorder />;
    if (this.state.recipe.favorite === true) {
      favoriteBtnImg = <MdFavorite />; // text
    }
    return (
      <div className="recipe-details-page">
        <div className="recipe-details-top">
          <div className="recipe-details-cat">{this.state.recipe.category}</div>
          <Link className="recipe-card-link" to={'/RecipeEdit/' + this.state.recipe._id}>
            <FiEdit onClick={this.onEditRecipe} className="buttonEdit" />
          </Link>
        </div>
        <div className="recipe-details">
          <div className="recipe-details-title">{this.state.recipe.title}</div>
          <div className="recipe-card__picture">
            <img src={this.getPicture()} />
            <span className="recipe-card__add-to-notebook" onClick={this.onChangeFavorites}>
              <i className="recipe-card_icon">{favoriteBtnImg}</i>
            </span>
          </div>
          {/* <span className="recipe-details-category">{this.state.recipe.category}</span> */}
          <ul className="infos_general">
            <li className="info_li">
              <GiCookingPot />
              <div className="generalCHooselabel">{this.state.recipe.cookingTime}</div>
            </li>
            <li className="info_li">
              <FaUtensilSpoon />
              <div className="generalCHooselabel">{this.state.recipe.preparationTime}</div>
            </li>
            <li className="info_li">
              <FaUserFriends />
              <div className="generalCHooselabel">{this.state.recipe.nbPerson}</div>
            </li>
          </ul>
          <Recipe_content_mobile recipe={this.state.recipe} />
          <Recipe_content_desktop recipe={this.state.recipe} />
        </div>
      </div>
    );
  };
}
export default Recipe_details;
