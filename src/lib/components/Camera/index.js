import React from 'react';
import PropTypes from 'prop-types';
import CameraHelper from '../../CameraHelper';

/*
Inspiration : https://www.html5rocks.com/en/tutorials/getusermedia/intro/
*/
export default class Camera extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.cameraHelper = null;
  }

  componentDidMount() {
    this.cameraHelper = new CameraHelper(this.refs.video, this.props.autoPlay);
    this.cameraHelper.enumerateDevice()
      .catch((error)=>{
        this.props.onCameraError(error);
      });
  }

  /*
   * Public fct accessed by ref
   */
  playFirstDevice = () => {
    this.cameraHelper.playFirstDevice()
      .then(()=>{
        this.props.onCameraStart();
      })
      .catch((error)=>{
        this.props.onCameraError(error);
      });
  }

  playLastDevice = () => {
    this.cameraHelper.playFirstDevice()
      .then(()=>{
        this.props.onCameraStart();
      })
      .catch((error) => {
        this.props.onCameraError(error);
      });
  }

  getDataUri = (sizeFactor) => {
    return this.cameraHelper.getDataUri(sizeFactor);
  }

  stopStreams = () => {
    this.cameraHelper.stopStreams()
      .then(() => {
        this.props.onCameraStop();
      })
      .catch((error) => {
          console.log(error);
      });
  }

  render() {
    return (
      <video
        ref="video"
        autoPlay="true"
      />
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
