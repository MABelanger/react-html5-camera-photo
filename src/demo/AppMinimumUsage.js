import React, { Component } from 'react';
import Camera from '../lib';
import './reset.css';

class App extends Component {
  onCameraError (error) {
    let {code, message, name} = error;
    let strError = `Camera Error: code: ${code} message: ${message} name: ${name}`;
    console.error(strError);
  }

  onTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  render () {
    return (
      <div className="App">
        <Camera
          onCameraError = {this.onCameraError}
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
        />
      </div>
    );
  }
}

export default App;
