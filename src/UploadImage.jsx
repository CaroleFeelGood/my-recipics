import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from './Button.jsx';
import Spinner from './Spinner.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Crop from './Crop.jsx';
class U_UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '', uploading: false };
  }
  onChange = async e => {
    // const files = Array.from(e.target.files);
    this.setState({ uploading: true });

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log('file', file);
    // console.log('reader.result', reader.result);
    reader.onloadend = async () => {
      this.setState({
        uploading: false,
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
    console.log('reader.result', reader.result);
    this.props.setValue(file);
  };

  removeImage = id => {
    this.props.dispatch({
      type: 'add-title',
      content: {
        title: ''
      }
    });
    this.setState({
      file: '',
      imagePreviewUrl: '',
      uploading: false
    });
    this.props.setValue('');
  };

  render = () => {
    // const { uploading, imagePreviewUrl } = this.state;
    const { uploading } = this.state;
    // let imagePreviewUrl = this.props.recipieInProgress.picture;
    let imagePreviewUrl = this.props.value;
    let $imagePreview = null;
    let imageUpload = false;
    // console.log('imagePreviewUrl', imagePreviewUrl)
    if (imagePreviewUrl) {
      console.log('this.props.value', this.props.value);
      $imagePreview = <img src={this.props.value} alt="" value={this.props.value} onChange={this.props.setValue} />;
      imageUpload = true;
    }
    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />;
        case imageUpload:
          return (
            <div className="imgPreview">
              {$imagePreview}
              <div onClick={() => this.removeImage(imagePreviewUrl)} className="deleteImg">
                <div className="roundBtnDelete">
                  <FontAwesomeIcon icon={faTimesCircle} size="1x" />
                </div>
              </div>
            </div>
          );
        default:
          console.log('in case default', imagePreviewUrl);
          return <Button onChange={this.onChange} />;
      }
    };

    return <div>{content()}</div>;
  };
}
let stp = state => {
  return {
    recipieInProgress: state.recipieToAdd
  };
};
let UploadImage = connect(stp)(U_UploadImage);
export default UploadImage;
