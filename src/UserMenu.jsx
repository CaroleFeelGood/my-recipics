import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
// import { FiRefreshCw } from "@react-icons/fa";

import { faTasks, faLandmark, faSignOutAlt, faChessPawn, faDice, faSync, faUserTag, faStore } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faSync, faTasks, faLandmark, faSignOutAlt, faChessPawn, faDice, faUserTag, faStore);
class U_UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHitoric: false
    };
  }
  logout = async () => {
    let response = JSON.parse(await (await fetch('/logout', { method: 'post' })).text());

    if (response.success) {
      console.log('================================================ LOGOUT  RESPONSE');
      console.log(JSON.stringify(response));
      this.props.dispatch({
        type: 'user-logout'
      });
      this.props.history.push('/');
    } else {
      alert('Logout FAILED.');
    }
  };

  render = () => {
    return (
      <>
        <div className="flexUsermenu">
          <div className="triangle up"></div>
          <ul className="usermenu">
            <li className="iconeMenu" onClick={this.logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="LinkLogout">Logout</span>
            </li>
          </ul>
        </div>
      </>
    );
  };
}

let stp = state => {
  return {
    // Login booleans
    logged: state.logged

    // Other state properties here
    // ...
  };
};
let UserMenu = connect(stp)(withRouter(U_UserMenu));
export default UserMenu;
