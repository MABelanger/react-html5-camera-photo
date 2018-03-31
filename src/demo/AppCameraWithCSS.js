import React, { Component } from 'react';
import {CameraJs} from '../lib';



//let Camera = lib.Camera;



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
    console.log(this.refs.video)
    let cameraJs = new CameraJs(this.refs.video, false)
    cameraJs.enumerateDevice()
    .then(() => {
      //cameraJs.playFirstDevice()
    })
    .catch((error)=>{
      console.log('error', error)
    });
  }


  render() {


    return (
      <div className="App">
        <video
          ref="video"
          autoPlay="true"
        />
      </div>
    );
  }
}

export default AppCamera;
