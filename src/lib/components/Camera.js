import React from 'react';
import PropTypes from 'prop-types';
import Utilities from '../services/Utilities';

/*
Inspiration : https://www.html5rocks.com/en/tutorials/getusermedia/intro/
*/
export default class Camera extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      videoInputs: [],
      stream: null,
      videoSrc: ""
    };
  }

  componentDidMount() {
    if(this.state.videoInputs.length === 0) {
      this._enumerateDevice();
    }
  }

  /*
   * Public fct accessed by ref
   */
  playFirstDevice = () => {
    let firstDevice = this.state.videoInputs[0];
    this._getStreamDevice(firstDevice.deviceId);
  }

  getDataUri = (sizeFactor=1) => {
    let dataUri = Utilities.getDataUri(this.refs.video, sizeFactor);
    return dataUri;
  }

  stopStreams = () => {
    if (this.state.stream) {
      this.state.stream.getTracks().forEach(function(track) {
        track.stop();
      });
      this.setState({videoSrc: ""});
      if(this.props.onCameraStop){
        this.props.onCameraStop();
      }
    }
  }

  /*
   * private fct
   */
  _enumerateDevice = () => {
    navigator.mediaDevices.enumerateDevices()
      .then(this._gotDevices)
      .catch(this._handleError);
  }

  _gotDevices = (deviceInfos) => {
    let videoInputs = [];
    for (let i = 0; i !== deviceInfos.length; ++i) {
      let deviceInfo = deviceInfos[i];
      if (deviceInfo.kind === 'videoinput') { // && deviceInfo.label.includes('back')
        videoInputs.push(deviceInfo);
      }
    }
    this.setState({videoInputs});

    // Auto start the video if autoPlay is true
    if(this.props.autoPlay) {
      this.playFirstDevice();
    }
  }

  _getStreamDevice = (deviceId) => {
    this.stopStreams();
    let constraints = Utilities.getConstraints(deviceId);

    navigator.mediaDevices.getUserMedia(constraints)
        .then(this._gotStream)
        .catch(this._handleError);
  }

  _gotStream = (stream) => {
    let videoSrc = window.URL.createObjectURL(stream);
    // the "stream" state is only used to be able to stop it.
    // to display the video we need to set "videoSrc" state.
    // Update the state, triggering the component to re-render with the correct stream
    this.setState({
      stream,
      videoSrc
    });
    if(this.props.onCameraStart){
      this.props.onCameraStart();
    }
  }

  _handleError = (error) => {
    this.props.onCameraError(error);
    this.stopStreams();
  }

  render() {
    return (
      <video src={this.state.videoSrc} ref="video" autoPlay="true"/>
    );
  }
}

Camera.propTypes = {
  onCameraError: PropTypes.func.isRequired,
  autoPlay: PropTypes.bool,
  onCameraStart: PropTypes.func,
  onCameraStop: PropTypes.func
}
