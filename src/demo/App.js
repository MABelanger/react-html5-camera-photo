import React, { Component } from 'react';
import Camera from '../lib';
import Images from './Images';
import './App.css';

const Buttons = ({ onStopStreams, onPlayFirstDevice, onGetDataUri, onClearPhotos }) => {
  return(
    <div>
      <button
        onClick={(e) => {
          onPlayFirstDevice();
        }}
      >Play</button>

      <button
        onClick={(e) => {
          onGetDataUri();
        }}
      >Photo</button>

      <button
        onClick={(e) => {
          onStopStreams();
        }}
      >Stop</button>

      <button
        onClick={(e) => {
          onClearPhotos();
        }}
      >Clear</button>
    </div>
  );
}

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataUris: [],
      isCameraRunning: false
    };
    this.camera = {};
  }

  getDataUri = () => {
    let dataUri = this.camera.getDataUri();
    this.setState({
      dataUris: this.state.dataUris.concat(dataUri)
    });
  }

  onClearPhotos = () => {
    this.setState({
      dataUris: []
    });
  }

  handleError = (error) => {
    let {code, message, name} = error;
    let strError = `
      Camera Error:
        code: ${code}
        message: ${message}
        name: ${name}`;
    console.error(strError);
  }

  onCameraStart = () => {
    console.log('camera start');
    this.setState({
      isCameraRunning: true
    });
  }

  onCameraStop = () => {
    console.log('camera stop');
    this.setState({
      isCameraRunning: false
    });
  }

  render() {

  let infoCamera = this.state.isCameraRunning
    ? <div className="txt-green"> Camera ON </div>
    : <div className="txt-red"> Camera OFF </div>

    return (
      <div className="App">

        <div className="camera">
          <Camera
            ref={instance => {
              this.camera = instance;
            }}
            handleError = {this.handleError}
            onCameraStart = {this.onCameraStart}
            onCameraStop = {this.onCameraStop}
          />

          { infoCamera }

          <Buttons
            onStopStreams = {()=>{this.camera.stopStreams()}}
            onPlayFirstDevice = {()=>{this.camera.playFirstDevice()}}
            onGetDataUri = {()=>{this.getDataUri()}}
            onClearPhotos = {()=>{this.onClearPhotos()}}
          />
        </div>

        <Images
          dataUris = {this.state.dataUris}
        />
      </div>
    );
  }
}

export default App;
