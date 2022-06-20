import React from 'react';
import Camera, { FACING_MODES } from '../lib';
import './reset.css';

function App (props) {
  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  return (
    <div>
      {
        // <div style={{ backgroundColor: 'white' }}>v3</div>
      }
      <Camera
        onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
      />
    </div>
  );
}

export default App;
