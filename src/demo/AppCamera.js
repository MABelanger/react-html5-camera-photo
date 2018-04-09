import React, { Component } from 'react';
import {Camera} from '../lib';
import './AppCamera.css';

class AppCamera extends Component {
  constructor (props, context) {
    super(props, context);
    this.cameraRef = React.createRef();
    this.state = {
      dataUri: ''
    };
  }

  componentDidMount () {

  }

  onCameraError (error) {
    let {code, message, name} = error;
    let strError = `
      Camera Error:
        code: ${code}
        message: ${message}
        name: ${name}`;
    console.error(strError);
  }

  onCameraStop () {
    console.log('camera stop');
    this.setState({
      isCameraRunning: false
    });
  }

  _playClickAudio () {
    let audio = new Audio('click.mp3');
    audio.play();
  }

  onTakePhoto () {
    this._playClickAudio();
  }

  render () {
    return (
      <div className="App">
        <Camera
          ref={this.cameraRef}
          onCameraError = {this.onCameraError}
          onCameraStop = {this.onCameraStop}
          onTakePhoto = {() => {
            this.onTakePhoto();
          }}
          autoStart={true}
          idealFacingMode={'environment'}
          idealResolution={{width: 640, height: 480}}
        />
      </div>
    );
  }
}

export default AppCamera;
