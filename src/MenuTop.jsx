import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Burger, Menu } from './components';
import UserMenu from './UserMenu.jsx';
import Menu_simple from './components/Menu_simple.jsx';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faUserCircle);

class U_MenuTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
      // setOpen: false
    };
  }

  setOpen = () => {
    console.log('this.state.open', this.state.open);
    this.setState({ open: !this.state.open });
  };
  userSettingsDisplay = () => {
    if (this.props.userSettingOpened) {
      // return <div className="userSettingsContainer">USER SETTINGS HERE</div>;
      return <UserMenu />;
    } else {
      return <></>;
    }
  };
  loginClick = e => {
    // let child = e.currentTarget.childNodes[0].tagName;

    console.log('User initials click');
    this.props.dispatch({
      type: 'user-settings',
      userSettingOpened: !this.props.userSettingOpened
    });
  };
  goToMenu = () => {
    this.props.history.push('/');
  };
  render = () => {
    let loginBtnImg = <FontAwesomeIcon icon={faUserCircle} />; // SVG
    if (this.props.logged) {
      loginBtnImg = this.props.userInitials; // text
    }
    return (
      <div className="top">
        <div className="top-container">
          {/* <Burger open={this.state.open} setOpen={this.setOpen} /> */}
          <Menu_simple />
          {/* <Menu open={this.state.open} setOpen={this.setOpen} /> */}
          <div className="menuTopCenter" onClick={this.goToMenu}>
            My recipics
          </div>

          <div className="menuTopRight">
            <Link className="LinkLikeFont" to={'/Recipies/' + 'favoris'}>
              <span className="myFavroites">
                <i className="recipe-card_icon">
                  <MdFavorite />
                </i>
              </span>
            </Link>
            <div className="roundBtn login" onClick={this.loginClick}>
              {loginBtnImg}
              {this.userSettingsDisplay()}
            </div>
          </div>
        </div>
      </div>
    );
  };
}
let stp = state => {
  return {
    logged: state.logged,
    firstName: state.firstName,
    lastName: state.lastName,
    userInitials: state.userInitials,
    chapter: state.chapter,
    userSettingOpened: state.userSettingOpened
  };
};
let MenuTop = connect(stp)(withRouter(U_MenuTop));
export default MenuTop;
