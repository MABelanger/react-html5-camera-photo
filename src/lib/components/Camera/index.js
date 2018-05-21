import React from 'react';
import PropTypes from 'prop-types';

import LibCameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo';
import CircleButton from '../CircleButton';
import {getShowHideStyle} from './helpers';
// import StopStartButton from '../StopStartButton';
import clickSound from './data/click-sound.base64.json';

import './styles/camera.css';

console.log('FACING_MODES', FACING_MODES);
/*
Inspiration : https://www.html5rocks.com/en/tutorials/getusermedia/intro/
*/
class Camera extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.libCameraPhoto = null;
    this.videoRef = React.createRef();
    this.state = {
      dataUri: '',
      isShowVideo: true,
      isCameraStarted: false
    };
  }

  componentDidMount () {
    this.libCameraPhoto = new LibCameraPhoto(this.videoRef.current);
    const {idealFacingMode, idealResolution, isMaxResolution} = this.props;
    if (isMaxResolution) {
      this.startCameraMaxResolution(idealFacingMode);
    } else {
      this.startCameraIdealResolution(idealFacingMode, idealResolution);
    }
  }

  componentWillUnmount () {
    this.stopCamera();
  }

  startCamera (promiseStartCamera) {
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

  startCameraIdealResolution (idealFacingMode, idealResolution) {
    let promiseStartCamera =
        this.libCameraPhoto.startCamera(idealFacingMode, idealResolution);
    this.startCamera(promiseStartCamera);
  }

  startCameraMaxResolution (idealFacingMode) {
    let promiseStartCamera =
        this.libCameraPhoto.startCameraMaxResolution(idealFacingMode);
    this.startCamera(promiseStartCamera);
  }

  stopCamera () {
    this.libCameraPhoto.stopCamera()
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

  playClickAudio () {
    let audio = new Audio('data:audio/mp3;base64,' + clickSound.base64);
    audio.play();
  }

  takePhoto (sizeFactor, imageType, imageCompression) {
    this.playClickAudio();
    let dataUri = this.libCameraPhoto.getDataUri(sizeFactor, imageType, imageCompression);
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
  }

  renderCircleButton (isVisible) {
    return (
      <CircleButton
        isClicked={!this.state.isShowVideo}
        onClick={() => {
          const {sizeFactor, imageType, imageCompression} = this.props;
          console.log(sizeFactor, imageType, imageCompression);
          this.takePhoto(sizeFactor, imageType, imageCompression);
        }}
      />
    );
  }

  renderWhiteFlash (isShowWhiteFlash) {
    const flashDoTransition = isShowWhiteFlash ? 'do-transition' : '';
    const flashClasses = `${flashDoTransition} normal`;
    return (
      <div className={flashClasses}>
      </div>
    );
  }

  // renderStopStartButton () {
  //   return (
  //     <StopStartButton
  //       isOpen={this.state.isCameraStarted}
  //       onClickStart={() => {
  //         this.startCamera(idealFacingMode, idealResolution);
  //       }}
  //
  //       onClickStop={() => {
  //         this.stopCamera();
  //       }}
  //     />
  //   );
  // }

  render () {
    let showHideVideoStyle = getShowHideStyle(this.state.isShowVideo);
    let showHideImgStyle = getShowHideStyle(!this.state.isShowVideo);

    return (
      <div className="react-html5-camera-photo">
        {this.renderWhiteFlash(!this.state.isShowVideo)}
        <img
          style = {showHideImgStyle}
          alt="camera"
          src={this.state.dataUri}
        />
        <video
          style = {showHideVideoStyle}
          ref={this.videoRef}
          autoPlay="true"
        />
        {this.renderCircleButton()}
      </div>
    );
  }
}

export {
  FACING_MODES,
  IMAGE_TYPES
};

export default Camera;

Camera.propTypes = {
  onTakePhoto: PropTypes.func.isRequired,
  onCameraError: PropTypes.func,
  idealFacingMode: PropTypes.string,
  idealResolution: PropTypes.object,
  imageType: PropTypes.string,
  imageCompression: PropTypes.number,
  isMaxResolution: PropTypes.bool,
  sizeFactor: PropTypes.number,
  onCameraStart: PropTypes.func,
  onCameraStop: PropTypes.func
};
