import React, { Component } from 'react';
import { connect } from 'react-redux';
import UploadImage from './UploadImage.jsx';
import Crop from './Crop.jsx';
class U_Step_title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      title: ''
    };
  }
  onPictureChange = path => {
    newImages = path;
    this.setState({ img: path });
  };

  inputChange = event => {
    let titleUpperCase = event.target.value.toUpperCase();
    console.log('titleUpperCase', titleUpperCase);
    this.props.dispatch({
      type: 'title',
      content: {
        title: titleUpperCase
      }
    });

    // this.props.recipieInProgress.title = event.target.value.toUpperCase();
  };

  displayMode = () => {
    // console.log('this.props.show', this.props.show);
    switch (this.props.show) {
      case 'create':
        this.title = 'CHOOSE A TITLE';
        this.crop = <Crop action="title" content="title" />;
        return;
      // return <Crop action="title" content="title" />;
      case 'recap':
        this.title = 'TITLE';
        this.crop = '';
        return;
      default:
        this.title = 'TITLE';
        this.crop = '';
        return;
    }
  };
  render = () => {
    this.displayMode();
    // console.log('this.title', this.title);
    // console.log('this.crop', this.crop);
    return (
      <div className="stepsOCR">
        <div className="steps-title">{this.title}</div>
        <div className="step-title-crop">
          {this.crop}
          {/* <Crop action="title" content="title" /> */}
          <textarea className="largeInputCrop" type="text" id="title" value={this.props.recipieInProgress.title} onChange={this.inputChange} />
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    recipieInProgress: state.recipieToAdd
  };
};
let Step_title = connect(mapStateToProps)(U_Step_title);
export default Step_title;
