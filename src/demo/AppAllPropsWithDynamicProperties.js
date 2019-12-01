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

  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }

  function handleCameraStart (stream) {
    console.log('handleCameraStart');
  }

  function handleCameraStop () {
    console.log('handleCameraStop');
  }

  return (
    <div>
      { renderButtons() }
      <Camera
        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
        onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
        onCameraError = { (error) => { handleCameraError(error); } }
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
        onCameraStart = { (stream) => { handleCameraStart(stream); } }
        onCameraStop = { () => { handleCameraStop(); } }
      />
    </div>
  );
}

export default App;
