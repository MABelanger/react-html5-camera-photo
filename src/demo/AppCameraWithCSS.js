import React, { Component } from 'react';
import {CameraWithCSS} from '../lib';



const IMAGE_THUMB_SIZE_FACTOR = .1;


class AppCamera extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataUris: [],
      isCameraRunning: false
    };
  }

  componentDidMount(){

  }


  render() {


    return (
      <div className="App">
        <CameraWithCSS/>
      </div>
    );
  }
}

export default AppCamera;
