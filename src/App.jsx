import React, { Component } from 'react';
import { Route, BrowserRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuTop from './MenuTop.jsx';
import MenuBottom from './MenuBottom.jsx';
import Form_login from './Form_login.jsx';
import Form_signup from './Form_signup.jsx';
import Cookies from 'js-cookie';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import Categories from './Categories.jsx';
import Steps_Recipies from './Steps_Recipies.jsx';
import Recipies_list from './Recipies_list.jsx';
import Recipe_details from './Recipe_details.jsx';
import Recipe_details_modify from './Recipe_details_modify.jsx';

class U_App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
      // setOpen: false
    };
  }
  showFormLogin = () => {
    console.log('this.props.logged', this.props.logged);
    if (!this.props.logged) return <Form_login />;
    else {
      this.props.dispatch({
        type: 'bottom',
        content: {
          bottom: true
        }
      });
      return <Categories />;
    }
  };

  init = () => {
    this.props.dispatch({
      type: 'bottom',
      content: {
        bottom: false
      }
    });
    // return {this.showFormLogin()};
    console.log('this.props.logged', this.props.logged);
    if (!this.props.logged) return <Form_login />;
    else {
      this.props.dispatch({
        type: 'bottom',
        content: {
          bottom: true
        }
      });
      return <Categories />;
    }
  };

  addRecipe = () => {
    this.props.dispatch({
      type: 'bottom',
      content: {
        bottom: false
      }
    });
    this.props.dispatch({
      type: 'chapter',
      content: {
        chapter: 'ADD RECIPE'
      }
    });
    return <Steps_Recipies />;
  };
  recipeDetail = routerData => {
    console.log('routerData.match.params.id', routerData.match.params.id);
    return <Recipe_details id={routerData.match.params.id} />;
  };
  recipeEdit = routerData => {
    console.log('routerData.match.params.id', routerData.match.params.id);
    this.props.dispatch({
      type: 'bottom',
      content: {
        bottom: false
      }
    });
    return <Recipe_details_modify id={routerData.match.params.id} />;
  };
  recipiesList = routerData => {
    this.props.dispatch({
      type: 'chapter',
      content: {
        chapter: routerData.match.params.cat
      }
    });
    console.log('in app recipieList fucntion cat', routerData.match.params.cat);
    // this.props.history.push('/Recipies/' + cat);
    return <Recipies_list cat={routerData.match.params.cat} />;
  };
  login = () => {
    return <Form_login />;
  };

  showBottom = () => {
    if (this.props.bottom) return <MenuBottom />;
  };

  signup = () => {
    return <Form_signup />;
  };
  // Login cookkie validation
  cookieCheck = async () => {
    if (Cookies.get('sid')) {
      let response = JSON.parse(await (await fetch('/cookie-check', { method: 'post' })).text());
      if (response.success) {
        this.props.dispatch({
          type: 'user-loggedin',
          content: {
            firstName: response.firstName,
            lastName: response.lastName,
            userInitials: response.userInitials
          }
        });
      }
    }
  };

  componentDidMount = () => {
    this.cookieCheck();
  };

  render = () => {
    // const [open, setOpen] = useState(false);
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <div className="global-container">
            <MenuTop />
            {/* <Burger open={this.state.open} setOpen={this.setOpen} />
          <Menu open={this.state.open} setOpen={this.setOpen} /> */}
            <Route exact={true} path="/" render={this.init}></Route>
            <Route exact={true} path="/Recipe/addRecipe" render={this.addRecipe}></Route>
            <Route exact={true} path="/Recipies/:cat" render={this.recipiesList}></Route>
            <Route exact={true} path="/Recipedetail/:id" render={this.recipeDetail}></Route>
            <Route exact={true} path="/RecipeEdit/:id" render={this.recipeEdit}></Route>
            {/* <Route exact={true} path="/Recipe/aboutRecipe" render={this.aboutRecipe}></Route> */}
            {/* <Route exact={true} path="/Recipe/ingredientsRecipe" render={this.ingredientsRecipe}></Route>
          <Route exact={true} path="/Recipe/stepsRecipe" render={this.stepsRecipe}></Route> */}
            <Route exact={true} path="/login" render={this.login}></Route>
            <Route exact={true} path="/signup" render={this.signup}></Route>
            {this.showBottom()}
          </div>
        </ThemeProvider>
      </BrowserRouter>
    );
  };
}
let mapStateToProps = state => {
  return {
    logged: state.logged,
    firstName: state.firstName,
    lastName: state.lastName,
    userInitials: state.userInitials,
    bottom: state.bottom,
    chapter: state.chapter
  };
};
let App = connect(mapStateToProps)(U_App);
export default App;
