import React, { Component } from 'react';
import Camera from '../lib';
import './reset.css';
import CameraOverlay from './camera-overlay.png';

class App extends Component {
  onTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  render () {
    const cameraOverlayStyles = {
      position: 'absolute',
      zIndex: '1',
      opacity: '.5',
      top: '0'
    };
    return (
      <div className="App">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
        >
          <img style={cameraOverlayStyles} src={ CameraOverlay } />
        </Camera>
      </div>
    );
  }
}

export default App;
