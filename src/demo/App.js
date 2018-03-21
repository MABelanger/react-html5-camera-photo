import React, { Component } from 'react';
import Camera from '../lib';
import Images from './Images';
import './App.css';

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataUris: []
    };
  }

  onGetDataUri = (dataUri) => {
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
            ref={instance => { this.camera = instance; }}
            handleError = {this.handleError}
          />

          <button
            onClick={(e)=>{
              this.camera.stopStreams();
            }}
          >Stop</button>

          <button
            onClick={(e)=>{
              this.camera.playFirstDevice();
            }}
          >Play</button>

          <button
            onClick={(e)=>{
              let dataUri = this.camera.getDataUri();
              this.onGetDataUri(dataUri);
            }}
          >getDataUri</button>

          <Images dataUris = {this.state.dataUris}/>

      </div>
    );
  }
}

export default App;
