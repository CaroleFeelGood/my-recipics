import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
// import 'font-awesome/css/font-awesome.min.css';
// Font Awesome
import { FaBars, FaWindowClose, FaHome } from 'react-icons/fa';
import './Menu_simple.css';
class Menu_simple extends Component {
  render() {
    return (
      <div className="headerMenu">
        <a href="#main-menu" id="main-menu-toggle" className="menu-toggle" aria-label="Open main menu">
          <span className="sr-only">Open main menu</span>
          <FaBars aria-hidden="true" />
        </a>
        <Link className="linkMenu" to={'/'}>
          <h1 className="logoMenu">My Recipics</h1>
          {/* <FaHome className="logoMenu" aria-hidden="true" /> */}
        </Link>
        <nav id="main-menu" className="main-menu" aria-label="Main menu">
          <a href="#main-menu-toggle" id="main-menu-close" className="menu-close" aria-label="Close main menu">
            <span className="sr-only">Close main menu</span>
            <FaWindowClose aria-hidden="true" />
          </a>
          <ul>
            {/* <li>
              <Link className="" to={'/'}>
                Home
              </Link>
            </li> */}
            <li>
              <Link className="" to={'/Recipies/' + 'all'}>
                My All Recipes
              </Link>
              {/* <a href="#">My Recipes</a> */}
              {/* <div>My Recipes</div> */}
            </li>
            {/* <li> */}
            {/* <Link className="" to={'/Recipies/' + 'favoris'}>
                My Favorites
              </Link>
              {/* <a href="#">My Favorites</a> */}
            {/* </li> */}
            <li>
              <Link className="" to={'/Recipies/' + 'aperos'}>
                My Aperos
              </Link>
              {/* <a href="#">My Aperos</a> */}
            </li>
            <li>
              <Link className="" to={'/Recipies/' + 'entrees'}>
                My Starters
              </Link>
              {/* <a href="#">My Starters</a> */}
            </li>
            <li>
              <Link className="" to={'/Recipies/' + 'plats'}>
                My Main courses
              </Link>
              {/* <a href="#">My Main courses</a> */}
            </li>
            <li>
              <Link className="" to={'/Recipies/' + 'desserts'}>
                My Desserts
              </Link>
              {/* <a href="#">My Desserts</a> */}
            </li>
          </ul>
        </nav>
        <a href="#main-menu-toggle" className="backdrop" tabIndex="-1" aria-hidden="true" hidden></a>
      </div>
    );
  }
}
export default withRouter(Menu_simple);
