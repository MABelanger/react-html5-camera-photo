import React from 'react'
import PropTypes from 'prop-types'

import CameraHelper from '../../CameraHelper';
import CircleButton from './CircleButton';

export default class CameraWithCSS extends React.Component {

  constructor(){
    super();
    this.cameraHelper = null;
  }

  componentDidMount(){
    this.cameraHelper = new CameraHelper(this.refs.video, false);
    this.cameraHelper.enumerateDevice()
    .then(() => {
      this.cameraHelper.playFirstDevice()
    })
    .catch((error)=>{
      console.log('error', error)
    });
  }

  render() {
    return (
      <div className="camera">
        <video
          ref="video"
          autoPlay="true"
        />
        <CircleButton onClick={()=>{
          let dataUri = this.cameraHelper.getDataUri();
          this.props.onSetDataUri(dataUri);
        }}/>
      </div>
    );
  }
}
