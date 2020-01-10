import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import ProgressButton from 'react-progress-button';
class U_Crop extends PureComponent {
  state = {
    src: null,
    blob: null,
    crop: {
      unit: 'px',
      x: 130,
      y: 50,
      width: 200,
      height: 200
      // aspect: 16 / 9
    },
    buttonState: ''
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => this.setState({ src: reader.result }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop, 'newFile.jpeg');
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);
    // return canvas.toDataURL();
    // canvas.toBlob =>setState blob and push it in fetch
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        this.setState({ blob: blob });
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }
  sendImage = async img => {
    let data = new FormData();
    data.append('img', img);
    let response = JSON.parse(await (await fetch('/detectText', { method: 'post', body: data })).text());
    if (response.success) {
      let text = response.text.filter(line => {
        if (line !== '') return line;
      });
      console.log('text', text);
      let textLine = '';
      console.log('textLine', textLine);
      if (this.props.action === 'title') {
        textLine = text.join('').toUpperCase();
      } else {
        textLine = text.join('\n');
      }
      this.props.dispatch({
        type: this.props.action,
        content: {
          [this.props.content]: textLine
        }
      });
      console.log('uplaod image ok');
    } else {
      alert('OCR is not available.');
    }
  };
  sendToApi = async event => {
    event.preventDefault();

    this.setState({ buttonState: 'loading' });
    // make asynchronous call
    await this.sendImage(this.state.blob);
    setTimeout(() => {
      this.setState({ buttonState: 'success' });
    }, 9000);
  };
  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div className="crop">
        <label className="custom-file-upload">
          <input type="file" accept="image/*" onChange={this.onSelectFile} />
          <i>
            <FontAwesomeIcon icon={faCloudUploadAlt} color="#606060" />
            Scan from image (OCR)
          </i>
        </label>
        <div className="flexCropContainer">
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              className="flexCropContain"
            />
          )}
          <div className="flexCropContain">
            {croppedImageUrl && <img alt="Crop" style={{ maxWidth: '100%' }} className="imgCropped" src={croppedImageUrl} />}
          </div>
        </div>
        <ProgressButton onClick={e => this.sendToApi(e, croppedImageUrl)}>GO!</ProgressButton>
        {/* <button onClick={e => this.sendToApi(e, croppedImageUrl)}>Send</button> */}
      </div>
    );
  }
}
let stp = state => {
  return {
    recipieInProgress: state.recipieToAdd
  };
};
let Crop = connect(stp)(U_Crop);
export default Crop;
