import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlingBall } from '@fortawesome/free-solid-svg-icons';

export default class Spinner extends Component {
  render = () => {
    return (
      <div className="spinner fade in">
        <FontAwesomeIcon icon={faBowlingBall} size="5x" color="#4484ce" />
      </div>
    );
  };
}
