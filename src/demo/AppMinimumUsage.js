import React from 'react';
import Camera from '../lib';
import './reset.css';

function App (props) {
  function onTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  return (
    <Camera
      onTakePhoto = { (dataUri) => { onTakePhoto(dataUri); } }
    />
  );
}

export default App;
