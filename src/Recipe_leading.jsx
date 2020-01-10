import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
// Font Awesome
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { GiCookingPot, GiSpoon } from 'react-icons/gi';
import { FaUserFriends } from 'react-icons/fa';

class U_Recipe_leading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {}
    };
  }
  getPicture = () => {
    if (this.props.recipe.frontendPath === '') {
      switch (this.props.recipe.category) {
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
    } else return this.props.recipe.frontendPath;
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
      .then(() => {
        if (this.props.menu === 'favoris') this.props.loadRecipies(this.props.menu);
      })
      .catch(error => this.setState({ error }));
  };
  changeCategory = () => {
    console.log('this.state.recipe.category', this.state.recipe.category);
    this.props.loadRecipies(this.state.recipe.category);
    // this.props.history.push('/Recipies/' + this.state.recipe.category);
    // return <Redirect to={'/Recipies/' + this.state.recipe.category} />;
  };
  componentDidMount = () => {
    this.setState({ recipe: this.props.recipe });
  };
  render = () => {
    let favoriteBtnImg = <MdFavoriteBorder />;
    if (this.state.recipe.favorite === true) {
      favoriteBtnImg = <MdFavorite />; // text
    }
    return (
      <div className="recipe_card">
        <div className="recipe_title">{this.props.recipe.title}</div>
        <div className="recipe-card__picture">
          <Link className="recipe-card-link" to={'/Recipedetail/' + this.state.recipe._id}>
            <img src={this.getPicture()} />{' '}
          </Link>
          <span className="recipe-card__add-to-notebook" onClick={this.onChangeFavorites}>
            <i className="recipe-card_icon">{favoriteBtnImg}</i>
          </span>
          {/* <Link className="recipe-card-link" to={'/Recipies/' + this.state.recipe.category}> */}
          <span className="recipe-card__add-category" onClick={this.changeCategory}>
            {this.state.recipe.category}
          </span>
          {/* </Link> */}
        </div>
        <ul className="infos_general">
          <li className="info_li">
            <GiCookingPot />
            <div className="generalCHooselabel">{this.props.recipe.cookingTime}</div>
          </li>
          <li className="info_li">
            <GiSpoon />
            <div className="generalCHooselabel">{this.props.recipe.preparationTime}</div>
          </li>
          <li className="info_li">
            <FaUserFriends />
            <div className="generalCHooselabel">{this.props.recipe.nbPerson}</div>
          </li>
        </ul>
        {/*  favorite: false, */}
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    recipeCurrent: state.recipieToAdd
  };
};
let Recipe_leading = connect(mapStateToProps)(withRouter(U_Recipe_leading));
export default Recipe_leading;
