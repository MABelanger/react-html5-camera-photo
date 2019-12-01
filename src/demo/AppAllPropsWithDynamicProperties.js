import React, { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from '../lib';
import './reset.css';

function App (props) {
  const [idealFacingMode, setIdealFacingMode] = useState(null);
  const [isMaxResolution, setIsMaxResolution] = useState(false);

  function renderButtons () {
    return (
      <div>
        <button onClick={ (e) => {
          setIdealFacingMode(FACING_MODES.USER);
          setIsMaxResolution(false);
        }}> FACING_MODES.USER </button>

        <button onClick={ (e) => {
          setIdealFacingMode(FACING_MODES.ENVIRONMENT);
          setIsMaxResolution(true);
        }}> FACING_MODES.ENVIRONMENT & MaxResolution</button>
      </div>
    );
  }

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
    <div>
      { renderButtons() }
      <Camera
        onTakePhoto = { (dataUri) => { onTakePhoto(dataUri); } }
        onTakePhotoAnimationDone = { (dataUri) => { onTakePhotoAnimationDone(dataUri); } }
        onCameraError = { (error) => { onCameraError(error); } }
        idealFacingMode = {idealFacingMode}
        idealResolution = {{width: 640, height: 480}}
        imageType = {IMAGE_TYPES.JPG}
        imageCompression = {0.97}
        isMaxResolution = {isMaxResolution}
        isImageMirror = {false}
        isSilentMode = {false}
        isDisplayStartCameraError = {true}
        isFullscreen = {false}
        sizeFactor = {1}
        onCameraStart = { (stream) => { onCameraStart(stream); } }
        onCameraStop = { () => { onCameraStop(); } }
      />
    </div>
  );
}

export default App;
