import React, { Component } from 'react';
import Camera from '../lib';
import './AppStandardUsage.css';

const IMAGE_THUMB_SIZE_FACTOR = .1;

const Image = ({ dataUri }) => {
  // if no dataUri or dataUri is data empty, use gif blank 1px
  let dataUriImage = (!dataUri || dataUri === "data:,")
    ? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    : dataUri;
  return(
      <img alt="camera" src={dataUriImage}/>
  );
}

export const Images = ({ dataUris }) => {
  return(
    dataUris.reverse().map((dataUri, index) => {
      return <Image key={index} dataUri={dataUri}/>
    })
  );
}

const Buttons = ({ onStopCamera, onStartCamera, onGetDataUri, onClearPhotos }) => {
  return(
    <div>
      <button
        onClick={(e) => {
          onStartCamera();
        }}
      >Play</button>

      <button
        onClick={(e) => {
          onGetDataUri();
        }}
      >Photo</button>

      <button
        onClick={(e) => {
          onStopCamera();
        }}
      >Stop</button>

      <button
        onClick={(e) => {
          onClearPhotos();
        }}
      >Clear</button>
    </div>
  );
}

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataUris: [],
      isCameraRunning: false
    };
  }

  setDataUri = () => {
    let dataUri = this.refs.camera.getDataUri(IMAGE_THUMB_SIZE_FACTOR);
    this.setState({
      dataUris: this.state.dataUris.concat(dataUri)
    });
  }

  onClearPhotos = () => {
    this.setState({
      dataUris: []
    });
  }

  onCameraError = (error) => {
    let {code, message, name} = error;
    let strError = `
      Camera Error:
        code: ${code}
        message: ${message}
        name: ${name}`;
    console.error(strError);
  }

  onCameraStart = () => {
    console.log('camera start');
    this.setState({
      isCameraRunning: true
    });
  }

  onCameraStop = () => {
    console.log('camera stop');
    this.setState({
      isCameraRunning: false
    });
  }

  render() {

  let infoCamera = this.state.isCameraRunning
    ? <div className="txt-green"> Camera ON </div>
    : <div className="txt-red"> Camera OFF </div>

    return (
      <div className="App">

        <div className="camera">
          <Camera
            ref="camera"
            onCameraError = {this.onCameraError}
            autoStart={false}
            onCameraStart = {this.onCameraStart}
            onCameraStop = {this.onCameraStop}
            onVideoClick = {()=>{this.setDataUri()}}
          />

          { infoCamera }

          <Buttons
            onStopCamera = {()=>{this.refs.camera.stopCamera()}}
            onStartCamera = {()=>{this.refs.camera.startCamera()}}
            onGetDataUri = {()=>{this.setDataUri()}}
            onClearPhotos = {()=>{this.onClearPhotos()}}
          />
        </div>

        <Images
          dataUris = {this.state.dataUris}
        />
      </div>
    );
  }
}

export default App;
