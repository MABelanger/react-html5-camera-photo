import React from 'react';
import Camera, { FACING_MODES } from '../lib';
import './reset.css';

function App (props) {
  function onTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  return (
    <div className="App">
      <Camera
        onTakePhoto = { (dataUri) => { onTakePhoto(dataUri); } }
        idealFacingMode = {FACING_MODES.ENVIRONMENT}
      />
    </div>
  );
}

export default App;
