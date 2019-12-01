import React, { useState } from 'react';
import Camera from '../lib';
import './reset.css';

function App (props) {
  const [isRemoveCamera, setIsRemoveCamera] = useState(false);

  // umount camera after 10 seconds
  setTimeout(() => {
    setIsRemoveCamera(true);
  }, 2000);

  function handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  return isRemoveCamera ? null : (
    <Camera
      onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
    />
  );
}

export default App;
