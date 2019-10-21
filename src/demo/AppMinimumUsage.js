import React, { Component } from 'react';
import Camera, { FACING_MODES } from '../lib';
import './reset.css';

class App extends Component {
  onTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  render () {
    return (
      <div className="App">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
        />
      </div>
    );
  }
}

export default App;
