import React from 'react';
import PropTypes from 'prop-types';

import CameraHelper from '../../CameraHelper';
import CircleButton from './CircleButton';

const Buttons = ({ onStopStreams, onPlayLastDevice, onGetDataUri, onClearPhotos }) => {
  return(
    <div>
      <button
        onClick={(e) => {
          onPlayLastDevice();
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


/*
Inspiration : https://www.html5rocks.com/en/tutorials/getusermedia/intro/
*/
export default class Camera extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.cameraHelper = null;
  }

  componentDidMount() {
    this.cameraHelper = new CameraHelper(this.refs.video, false);
    this.cameraHelper.enumerateDevice();
  }

  /*
   * Public fct accessed by ref
   */
  playFirstDevice = () => {
    this.cameraHelper.playFirstDevice()
    .then(()=>{
      this.props.onCameraStart();
    })
  }

  playLastDevice = () => {
    this.cameraHelper.playLastDevice()
    .then(()=>{
      this.props.onCameraStart();
    })
  }

  getDataUri = () => {
    return this.cameraHelper.getDataUri();
  }

  stopStreams = () => {
    this.cameraHelper.stopStreams()
      .then(() => {
        this.props.onCameraStop()
      })
      .catch((error)=>{
          console.log(error)
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

Camera.propTypes = {
  onCameraError: PropTypes.func.isRequired,
  autoPlay: PropTypes.bool,
  onCameraStart: PropTypes.func,
  onCameraStop: PropTypes.func,
  onVideoClick: PropTypes.func
}
