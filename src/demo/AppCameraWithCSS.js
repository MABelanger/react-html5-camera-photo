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

  _playClickAudio() {
    let audio = new Audio('click.mp3');
    audio.play();
  }

  onTakePhoto = () => {
    this._playClickAudio();
  }


  render() {

    return (
      <div className="App">
        <CameraWithCSS
          onCameraStop = {this.onCameraStop}
          onTakePhoto = {()=>{
            this.onTakePhoto();
          }}
          autoPlay={true}
        />
      </div>
    );
  }
}

export default AppCamera;
