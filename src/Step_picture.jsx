import React, { Component } from 'react';
import { connect } from 'react-redux';
import UploadImage from './UploadImage.jsx';
import Crop from './Crop.jsx';
class U_Step_picture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      img: null
    };
  }
  dispatch = (imageURL, imageFile) => {
    this.props.dispatch({
      type: 'picture',
      content: {
        picture: imageURL,
        img: imageFile
      }
    });
  };
  onPictureChange = img => {
    if (img !== '') {
      this.setState({ picture: URL.createObjectURL(img), img: img }, () => this.dispatch(this.state.picture, this.state.img));
    } else {
      this.setState({ picture: '' }, () => this.dispatch(''));
    }
  };

  inputChange = event => {
    this.props.dispatch({
      type: 'add-picture',
      content: {
        title: event.target.value
      }
    });
  };
  displayMode = () => {
    // console.log('this.props.show', this.props.show);
    switch (this.props.show) {
      case 'create':
        this.title = 'CHOOSE A PICTURE';
        // this.crop = <Crop action="title" content="title" />;
        return;
      // return <Crop action="title" content="title" />;
      case 'recap':
        this.title = 'PICTURE';
        // this.crop = '';
        return;
      default:
        this.title = 'PICTURE';
        // this.crop = '';
        return;
    }
  };
  render = () => {
    this.displayMode();
    return (
      <div className="steps">
        <div className="steps-title">{this.title}</div>
        <div className="step-title-crop-picture">
          <UploadImage
            value={this.props.recipieInProgress.picture}
            setValue={e => {
              this.onPictureChange(e);
            }}
          />
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
let Step_picture = connect(mapStateToProps)(U_Step_picture);
export default Step_picture;
