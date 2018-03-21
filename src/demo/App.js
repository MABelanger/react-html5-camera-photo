import React, { Component } from 'react';
import Camera from '../lib';
import ImageMedia from './ImageMedia';
import './App.css';

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataUri: ""
    };
  }

  onGetDataUri = (dataUri) => {
    this.setState({
      dataUri:dataUri
    });
  }

  render() {
    return (
      <div className="App">

          <Camera ref={instance => { this.camera = instance; }}/>

          <button onClick={(e)=>{
            this.camera.stopStreams();
          }}>Stop</button>

          <button onClick={(e)=>{
            this.camera.playFirstDevice();
          }}>Play</button>

          <button onClick={(e)=>{
            let dataUri = this.camera.getDataUri();
            this.onGetDataUri(dataUri);
          }}>getDataUri</button>

          <ImageMedia dataUri={this.state.dataUri}/>

      </div>
    );
  }
}

export default App;
