import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class MenuLeft extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render = () => {
    return (
      <div>
        <Link to="/recipe/">Create recipe</Link>
      </div>
    );
  };
}

export default MenuLeft;
