import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Link, Redirect, withRouter } from 'react-router-dom';
// Font Awesome
import { MdNavigateNext, MdFavoriteBorder } from 'react-icons/md';
import { IconContext } from 'react-icons';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nbRecipes: {
        nbRecipesAll: 0,
        nbRecipesEntrees: 0,
        nbRecipesAperos: 0,
        nbRecipesPlat: 0,
        nbRecipesDessert: 0
      }
    };
  }
  recipiesCat = category => {
    this.props.history.push('/Recipies/' + category);
  };
  nbRecipes = async () => {
    console.log('nbRecipes');
    fetch('/countRecipes')
      .then(response => {
        // console.log('response', response);
        if (response.ok) {
          console.log('nbRecipies ok', response);
          return response.json();
        } else {
          console.log('erreur dans nbRecipies');
          throw new Error('Something went wrong ...', response.error);
        }
      })
      .then(data => {
        console.log('data.nbRecipes', data.nbRecipes);
        this.setState({ nbRecipes: data.nbRecipes });
      })
      .then(console.log('finish'))
      .catch(error => this.setState({ error }));
  };
  componentDidMount = async () => {
    // console.log('in didMount of recipies list');
    // this.setState({ isLoading: true });
    await this.nbRecipes();
  };

  // componentDidUpdate = async prevProps => {
  //   console.log('in componentDidUpdate of categories');
  //   // this.forceUpdate();
  //   // if (this.props.cat !== prevProps.cat) {
  //   // this.nbRecipes();
  //   // }
  // };
  render = () => {
    // await this.nbRecipes();
    console.log('nbRecipesAll', this.state.nbRecipes.nbRecipesAll);
    console.log('nbRecipesAperos', this.state.nbRecipes.nbRecipesAperos);
    console.log('nbRecipesEntrees', this.state.nbRecipes.nbRecipesEntrees);
    console.log('nbRecipesPlat', this.state.nbRecipes.nbRecipesPlat);
    console.log('nbRecipesDessert', this.state.nbRecipes.nbRecipesDessert);
    // console.log(this.state.nbRecipes.nbRecipesAperos);
    return (
      <div className="pageCat">
        <img className="imageRecettes" src="/images/fond-site 2.jpg" />
        <Link className="LinkLikeFont" to={'/Recipies/' + 'all'}>
          <div className="recipiesTitle">
            <div className="recipiesTitle-title">MY RECIPES</div>
            <div>
              <IconContext.Provider value={{ size: '2em' }}>
                <MdNavigateNext className="recipiesTitle icon" />{' '}
              </IconContext.Provider>
            </div>
          </div>
        </Link>
        <div className="categories">
          {/* <Link className="LinkLikeFont" to={'/Recipies/' + 'aperos'}> */}
          <div className="categorie" onClick={() => this.recipiesCat('aperos')}>
            <img src="/images/apero.png" />
            <div className="categoriesDesc">
              <div>APÉROS</div>
              {/* <div></div> */}
              <div className="numberRecipies">{this.state.nbRecipes.nbRecipesAperos}</div>
            </div>
          </div>
          {/* </Link> */}
          <div className="categorie" onClick={() => this.recipiesCat('entrees')}>
            {/* <Link className="LinkLikeFont" to={'/Recipies/' + 'entrees'}> */}
            <img src="/images/entree.png" />
            <div className="categoriesDesc ">
              <div>ENTREES</div>
              <div className="numberRecipies">{this.state.nbRecipes.nbRecipesEntrees}</div>
            </div>
            {/* </Link> */}
          </div>
          <div className="categorie" onClick={() => this.recipiesCat('plats')}>
            {/* <Link className="LinkLikeFont" to={'/Recipies/' + 'plats'}> */}
            <img src="/images/plats.png" />
            <div className="categoriesDesc">
              <div>PLATS</div>
              <div className="numberRecipies"> {this.state.nbRecipes.nbRecipesPlat}</div>
            </div>
            {/* </Link> */}
          </div>
          <div className="categorie" onClick={() => this.recipiesCat('desserts')}>
            {/* <Link className="LinkLikeFont" to={'/Recipies/' + 'desserts'}> */}
            <img src="/images/dessert.png" />
            <div className="categoriesDesc  ">
              <div>DESSERTS</div>
              <div></div>
              <div className="numberRecipies">{this.state.nbRecipes.nbRecipesDessert}</div>
            </div>
            {/* </Link> */}
          </div>
        </div>
        {/* <Link className="LinkLikeFont" to={'/Recipies/' + 'favoris'}>
          <div className="categoriesButton ">MES FAVORIS</div>
        </Link> */}
      </div>
    );
  };
}

export default withRouter(Categories);
