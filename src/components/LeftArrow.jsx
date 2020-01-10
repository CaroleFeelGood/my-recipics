import React, { Component } from 'react';
// import 'font-awesome/css/font-awesome.min.css';
// Font Awesome
import { FaAngleLeft } from 'react-icons/fa';
class LeftArrow extends Component {
  render() {
    return (
      <div className="backArrow" onClick={this.props.goToPrevSlide}>
        <FaAngleLeft aria-hidden="true" />

        {/* <i className="fa fa-angle-left fa-3x" aria-hidden="true"></i> */}
      </div>
    );
  }
}
export default LeftArrow;
