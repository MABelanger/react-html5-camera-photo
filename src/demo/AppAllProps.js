import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from '../lib';
import './reset.css';

class App extends Component {
  onTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  onCameraError (error) {
    console.error('onCameraError', error);
  }

  onCameraStart (stream) {
    console.log('onCameraStart');
  }

  onCameraStop () {
    console.log('onCameraStop');
  }

  render () {
    return (
      <div className="App">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          onCameraError = { (error) => { this.onCameraError(error); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 640, height: 480}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.97}
          isMaxResolution = {false}
          isImageMirror = {false}
          isSilentMode = {false}
          isDisplayStartCameraError = {true}
          sizeFactor = {1}
          onCameraStart = { (stream) => { this.onCameraStart(stream); } }
          onCameraStop = { () => { this.onCameraStop(); } }
        />
      </div>
    );
  }
}

export default App;
