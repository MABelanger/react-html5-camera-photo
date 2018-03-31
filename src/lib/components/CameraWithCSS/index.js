import React from 'react'
import PropTypes from 'prop-types'

import {CameraJs} from '../';
import CircleButton from './CircleButton';

export default class CameraWithCSS extends React.Component {

  componentDidMount(){
    let cameraJs = new CameraJs(this.refs.video, false)
    cameraJs.enumerateDevice()
    .then(() => {
      cameraJs.playFirstDevice()
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
        <CircleButton onVideoClick={this.props.onVideoClick}/>
      </div>
    );
  }
}
