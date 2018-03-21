import React, { Component } from 'react';
import Camera from '../lib';
import Images from './Images';
import './App.css';


const Buttons = ({ onStopStreams, onPlayFirstDevice, onGetDataUri }) => {
  return(
    <div>
      <button
        onClick={(e) => {
          onStopStreams();
        }}
      >Stop</button>

      <button
        onClick={(e) => {
          onPlayFirstDevice();
        }}
      >Play</button>

      <button
        onClick={(e) => {
          onGetDataUri();
        }}
      >getDataUri</button>
    </div>
  );
}

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataUris: []
    };
    this.camera = {};
  }

  getDataUri = () => {
    let dataUri = this.camera.getDataUri();
    this.setState({
      dataUris: this.state.dataUris.concat(dataUri)
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

  render() {
    return (
      <div className="App">
        <Camera
          ref={instance => {
            this.camera = instance;
          }}
          handleError = {this.handleError}
        />

        <Buttons
          onStopStreams = {()=>{this.camera.stopStreams()}}
          onPlayFirstDevice = {()=>{this.camera.playFirstDevice()}}
          onGetDataUri = {()=>{this.getDataUri()}}
        />

        <Images
          dataUris = {this.state.dataUris}
        />
      </div>
    );
  }
}

export default App;
