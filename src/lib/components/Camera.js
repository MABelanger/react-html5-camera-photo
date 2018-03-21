import React from 'react';
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
      videoSrc: "",
      videoError: null
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

  getDataUri = () => {
    let dataUri = Utilities.getDataUri(this.refs.video);
    return dataUri;
  }

  stopStreams = () => {
    if (this.state && this.state.stream) {
      this.state.stream.getTracks().forEach(function(track) {
        track.stop();
      });
      this.setState({videoSrc: ""});
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
  }

  _handleError = (error) => {
    let {constraintName, message, name} = error;
    let errorStr = constraintName + message + name;
    this.setState({
      videoError:{msg: errorStr}
    });
    this.stopStreams();
  }

  render() {
    let videoError = this.state.videoError
      ? <div>{JSON.stringify(this.state.videoError)}</div>
      : null
    return (
      <div>
        {videoError}
        <div>
          <video src={this.state.videoSrc} ref="video" autoPlay="true"/>
        </div>
      </div>
    );
  }
}
