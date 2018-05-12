import React from 'react';
import PropTypes from 'prop-types';

import LibCameraPhoto from 'jslib-html5-camera-photo';
import CircleButton from '../CircleButton';
// import StopStartButton from '../StopStartButton';

import './styles/camera.css';

/*
Inspiration : https://www.html5rocks.com/en/tutorials/getusermedia/intro/
*/
class Camera extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.cameraHelper = null;
    this.videoRef = React.createRef();
    this.state = {
      dataUri: '',
      isShowVideo: true,
      isCameraStarted: false
    };
  }

  componentDidMount () {
    this.cameraHelper = new LibCameraPhoto(this.videoRef.current);
    const {idealFacingMode, idealResolution, isMaxResolution} = this.props;
    if (isMaxResolution) {
      this.startCameraMaxResolution(idealFacingMode);
    } else {
      this.startCameraIdealResolution(idealFacingMode, idealResolution);
    }
  }

  startCameraIdealResolution (idealFacingMode, idealResolution) {
    let promiseStartCamera =
        this.cameraHelper.startCamera(idealFacingMode, idealResolution);
    this._startCamera(promiseStartCamera);
  }

  startCameraMaxResolution (idealFacingMode) {
    let promiseStartCamera =
        this.cameraHelper.startCameraMaxResolution(idealFacingMode);
    this._startCamera(promiseStartCamera);
  }

  stopCamera () {
    this.cameraHelper.stopCamera()
      .then(() => {
        this.setState({isCameraStarted: false});
        if (this.props.onCameraStop) {
          this.props.onCameraStop();
        }
      })
      .catch((error) => {
        this.props.onCameraError(error);
      });
  }

  getShowHideStyle (isDisplay) {
    let displayStyle = isDisplay
      ? {display: 'inline-block'}
      : {display: 'none'};

    return displayStyle;
  }

  _startCamera (promiseStartCamera) {
    promiseStartCamera
      .then((stream) => {
        this.setState({isCameraStarted: true});
        if (this.props.onCameraStart) {
          this.props.onCameraStart(stream);
        }
      })
      .catch((error) => {
        this.props.onCameraError(error);
      });
  }

  _playClickAudio () {
    let audio = new Audio('click.mp3');
    audio.play();
  }

  _renderCircleButton (isVisible) {
    return (
      <CircleButton
        isClicked={!this.state.isShowVideo}
        onClick={() => {
          this._playClickAudio();
          let dataUri = this.cameraHelper.getDataUri(this.props.sizeFactor);
          this.props.onTakePhoto(dataUri);
          this.setState({
            dataUri,
            isShowVideo: false
          });
          setTimeout(() => {
            this.setState({
              isShowVideo: true
            });
          }, 900);
        }}
      />
    );
  }

  _renderFlashWhiteDiv (isShowVideo) {
    const flashDoTransition = isShowVideo ? '' : 'do-transition';
    const flashClasses = `${flashDoTransition} normal`;
    return (
      <div className={flashClasses}>
      </div>
    );
  }

  render () {
    let showVideoStyle = this.getShowHideStyle(this.state.isShowVideo);
    let showImgStyle = this.getShowHideStyle(!this.state.isShowVideo);
    let circleButton = this._renderCircleButton();
    let flashWhiteDiv = this._renderFlashWhiteDiv(this.state.isShowVideo);

    return (
      <div className="camera-mobile-style">
        {flashWhiteDiv}
        <img
          style = {showImgStyle}
          alt="camera"
          src={this.state.dataUri}
        />
        <video
          style = {showVideoStyle}
          ref={this.videoRef}
          autoPlay="true"
        />
        {circleButton}
      </div>
    );
  }
}

/*
<StopStartButton
  isOpen={this.state.isCameraStarted}
  onClickStart={() => {
    this.startCamera(idealFacingMode, idealResolution);
  }}

  onClickStop={() => {
    this.stopCamera();
  }}
/>
*/
export default Camera;

Camera.propTypes = {
  onTakePhoto: PropTypes.func.isRequired,
  onCameraError: PropTypes.func,
  idealFacingMode: PropTypes.string,
  idealResolution: PropTypes.object,
  isMaxResolution: PropTypes.bool,
  sizeFactor: PropTypes.number,
  onCameraStart: PropTypes.func,
  onCameraStop: PropTypes.func
};
