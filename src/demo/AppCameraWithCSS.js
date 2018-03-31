import React, { Component } from 'react';
import {CameraWithCSS} from '../lib';



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

  setDataUri = (dataUri) => {
    console.log(dataUri)
    this.setState({dataUri});
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
          onSetDataUri = {(dataUri) => {
            this.setDataUri(dataUri)
          }}
          onCameraStop = {this.onCameraStop}
        />
        <img alt="camera" src={this.state.dataUri}/>
      </div>
    );
  }
}

export default AppCamera;
