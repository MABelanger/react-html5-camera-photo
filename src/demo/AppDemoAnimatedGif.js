import React, { useState } from 'react';
import Camera, { FACING_MODES } from '../lib';
import './reset.css';

function App (props) {
  const [dataUri, setDataUri] = useState(null);

  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
    setDataUri(dataUri);
  }

  return (
    <div>
      {
        // <div style={{ backgroundColor: 'white' }}>v3</div>
      }
      <Camera
        timer={3}
        onTakePhoto={handleTakePhoto}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
      />
      {dataUri && <img src={dataUri} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />}
    </div>
  );
}

export default App;
