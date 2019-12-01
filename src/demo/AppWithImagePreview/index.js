import React, { useState } from 'react';
import { Camera } from '../../lib';
import ImagePreview from './ImagePreview';
import '../reset.css';

function App (props) {
  const [dataUri, setDataUri] = useState('');

  function handleTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    setDataUri(dataUri);
  }

  const isFullscreen = false;
  return (
    <div>
      {
        (dataUri)
          ? <ImagePreview dataUri={dataUri}
            isFullscreen={isFullscreen}
          />
          : <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
            isFullscreen={isFullscreen}
          />
      }
    </div>
  );
}

export default App;
