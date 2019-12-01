import React from 'react';
import Camera from '../lib';
import './reset.css';

function App (props) {
  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  return (
    <Camera
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
    />
  );
}

export default App;
