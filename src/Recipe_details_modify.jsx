import React, { Component } from 'react';
import UploadImage from './UploadImage.jsx';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Font Awesome
import { MdNotInterested, MdFavoriteBorder } from 'react-icons/md';
import { GiCookingPot, GiSpoon } from 'react-icons/gi';
import { FaUserFriends, FaUtensilSpoon } from 'react-icons/fa';

import Recipe_content_mobile_modify from './Recipe_content_mobile_modify.jsx';
import Recipe_content_desktop_modify from './Recipe_content_desktop_modify.jsx';
class U_Recipe_details_modify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: '',
      img: null,
      recipe: {}
    };
  }
  saveRecipe = async () => {
    console.log('save recipe');
    // event.preventDefault();
    // var FlashMessage = require('./FlashMessage.jsx');
    let data = new FormData();
    data.append('recipe', JSON.stringify(this.state.recipe));
    data.append('img', this.state.img);
    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    let response = JSON.parse(await (await fetch('/editRecipe', { method: 'post', body: data })).text());
    console.log('response', response);
    if (response.success) {
      console.log('before redirect');
      this.loadRecipe(response.recipe._id);
    } else {
      alert('New recipe FAILED.');
    }
  };
  onChangeSteps = event => {
    let newRecipe = this.state.recipe;
    newRecipe.todo = event.target.value;
    this.setState({ recipe: newRecipe });
  };
  onChangeIng = event => {
    let newRecipe = this.state.recipe;
    newRecipe.ingredients = event.target.value;
    this.setState({ recipe: newRecipe });
  };
  onPictureChange = img => {
    console.log('img', img);
    let recipeChanged = this.state.recipe;
    if (img !== '') {
      recipeChanged.frontendPath = URL.createObjectURL(img);
      this.setState({ picture: URL.createObjectURL(img), img: img, recipe: recipeChanged });
    } else {
      recipeChanged.frontendPath = '';
      this.setState({ picture: '', recipe: recipeChanged });
    }
  };
  inputChange = event => {
    let newRecipe = this.state.recipe;
    newRecipe[event.target.id] = event.target.value;
    this.setState({ recipe: newRecipe });
    // this.props.dispatch({
    //   type: event.target.id,
    //   content: {
    //     [event.target.id]: event.target.value
    //   }
    // });
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
        .then(data => {
          this.setState({ recipe: data.recipe });
        })
        .catch(error => this.setState({ error }));
    };
    await getRecipe(id);
  };
  componentDidMount = async () => {
    this.loadRecipe(this.props.id);
  };
  render = () => {
    return (
      <div className="recipe-details-page">
        <div className="recipe-details-top">
          <div className="recipe-details-cat">{this.state.recipe.category}</div>
          <Link className="recipe-card-link" to={'/Recipedetail/' + this.state.recipe._id}>
            <MdNotInterested onClick={this.onEditRecipe} className="buttonEdit" />
          </Link>
        </div>
        <div className="recipe-details">
          <textarea className="recipe-details-title-change" id="title" value={this.state.recipe.title} onChange={this.inputChange} />
          <div className="recipe-card__picture changePicture">
            <UploadImage
              value={this.state.recipe.frontendPath}
              setValue={e => {
                this.onPictureChange(e);
              }}
            />
          </div>
          <ul className="infos_general-change">
            <li className="info_li">
              <GiCookingPot />
              <input
                type="time"
                id="cookingTime"
                min="00:00"
                value={this.state.recipe.cookingTime}
                onChange={this.inputChange}
                className="generalCHooselabelChange"
              />
            </li>
            <li className="info_li">
              <FaUtensilSpoon />
              <input
                type="time"
                id="preparationTime"
                min="00:00"
                value={this.state.recipe.preparationTime}
                onChange={this.inputChange}
                className="generalCHooselabelChange"
              />
              {/* <div className="generalCHooselabel">{this.state.recipe.preparationTime}</div> */}
            </li>
            <li className="info_li">
              <FaUserFriends />
              <input
                type="number"
                id="nbPerson"
                value={this.state.recipe.nbPerson}
                onChange={this.inputChange}
                className="generalCHooselabelChange"
              />
              {/* <div className="generalCHooselabel">{this.state.recipe.nbPerson}</div> */}
            </li>
          </ul>
          <Recipe_content_mobile_modify
            recipe={this.state.recipe}
            setValueIng={e => {
              this.onChangeIng(e);
            }}
            setValueSteps={e => {
              this.onChangeSteps(e);
            }}
          />
          <Recipe_content_desktop_modify
            recipe={this.state.recipe}
            setValueIng={e => {
              this.onChangeIng(e);
            }}
            setValueSteps={e => {
              this.onChangeSteps(e);
            }}
          />
        </div>
        <button onClick={() => this.saveRecipe()} className="saveButton">
          SAVE
        </button>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    recipieToChange: state.recipieToChange
  };
};
let Recipe_details_modify = connect(mapStateToProps)(U_Recipe_details_modify);
export default Recipe_details_modify;
