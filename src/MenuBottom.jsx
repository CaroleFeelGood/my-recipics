import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus);

class U_MenuBottom extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render = () => {
    return (
      <div className="menuBottom">
        <Link className="LinkLikeFontPlus" to="/Recipe/addRecipe">
          <FontAwesomeIcon className="addButton" icon={faPlus} />
        </Link>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    logged: state.logged,
    firstName: state.firstName,
    lastName: state.lastName,
    userInitials: state.userInitials
  };
};
let MenuBottom = connect(mapStateToProps)(U_MenuBottom);
export default MenuBottom;
