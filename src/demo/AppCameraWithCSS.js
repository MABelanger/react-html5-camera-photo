import React, { Component } from 'react';
import {CameraWithCSS} from '../lib';
import './AppCameraWithCSS.css';


const IMAGE_THUMB_SIZE_FACTOR = .1;

class AppCamera extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataUri: ""
    };
  }

  componentDidMount(){

  }

  onCameraStop = () => {
    console.log('camera stop');
    this.setState({
      isCameraRunning: false
    });
  }

  render() {

    return (
      <div className="App">
        <CameraWithCSS
          onCameraStop = {this.onCameraStop}
          autoPlay={true}
        />
      </div>
    );
  }
}

export default AppCamera;
