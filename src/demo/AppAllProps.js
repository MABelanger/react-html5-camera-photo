import React from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from '../lib';
import './reset.css';

function App (props) {
  function onTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function onTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function onCameraError (error) {
    console.log('onCameraError', error);
  }

  function onCameraStart (stream) {
    console.log('onCameraStart');
  }

  function onCameraStop () {
    console.log('onCameraStop');
  }

  return (
    <Camera
      onTakePhoto = { (dataUri) => { onTakePhoto(dataUri); } }
      onTakePhotoAnimationDone = { (dataUri) => { onTakePhotoAnimationDone(dataUri); } }
      onCameraError = { (error) => { onCameraError(error); } }
      idealFacingMode = {FACING_MODES.ENVIRONMENT}
      idealResolution = {{width: 640, height: 480}}
      imageType = {IMAGE_TYPES.JPG}
      imageCompression = {0.97}
      isMaxResolution = {true}
      isImageMirror = {false}
      isSilentMode = {false}
      isDisplayStartCameraError = {true}
      isFullscreen = {false}
      sizeFactor = {1}
      onCameraStart = { (stream) => { onCameraStart(stream); } }
      onCameraStop = { () => { onCameraStop(); } }
    />
  );
}

export default App;
