import React, { Component } from 'react';
import Camera from '../lib';
import './reset.css';

class App extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      isRemoveCamera: false
    };
    // umount camera after 10 seconds
    setTimeout(() => {
      this.setState({isRemoveCamera: true});
    }, 2000);
  }

  onTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  render () {
    return this.state.isRemoveCamera ? null : (
      <div className="App">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
        />
      </div>
    );
  }
}

export default App;
