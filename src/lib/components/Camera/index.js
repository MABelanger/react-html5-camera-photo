import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash/isEqual';

// for debugging with git cloned jslib-html5-camera-photo
// clone jslib-html5-camera-photo inside /src and replace
// from 'jslib-html5-camera-photo' -> from '../../../jslib-html5-camera-photo/src/lib';
import LibCameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo';
import CircleButton from '../CircleButton';
import {getShowHideStyle, getVideoStyles} from './helpers';
// import StopStartButton from '../StopStartButton';
import clickSound from './data/click-sound.base64.json';

import './styles/camera.css';

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
    this.handleTakePhoto = this.handleTakePhoto.bind(this);
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

  isDynamicPropsUpdate (props, nextProps) {
    return (
      !isEqual(props.idealFacingMode, nextProps.idealFacingMode) ||
      !isEqual(props.idealResolution, nextProps.idealResolution) ||
      !isEqual(props.isMaxResolution, nextProps.isMaxResolution)
    );
  }

  restartCamera (idealFacingMode, idealResolution, isMaxResolution) {
    this.stopCamera()
      .then()
      .catch((error) => { this.printCameraInfo(error.message); })
      .then(() => {
        if (isMaxResolution) {
          this.startCameraMaxResolution(idealFacingMode);
        } else {
          this.startCameraIdealResolution(idealFacingMode, idealResolution);
        }
      });
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps (nextProps) {
    if (this.isDynamicPropsUpdate(this.props, nextProps)) {
      const {idealFacingMode, idealResolution, isMaxResolution} = nextProps;
      this.restartCamera(idealFacingMode, idealResolution, isMaxResolution);
    }
  }

  componentWillUnmount () {
    this.stopCamera()
      .catch((error) => { this.printCameraInfo(error.message); });
  }

  printCameraInfo (info) {
    console.info('react-html5-camera-photo info:', info);
  }

  startCamera (promiseStartCamera) {
    promiseStartCamera
      .then((stream) => {
        this.setState({isCameraStarted: true});
        if (typeof this.props.onCameraStart === 'function') {
          this.props.onCameraStart(stream);
        }
      })
      .catch((error) => {
        if (typeof this.props.onCameraError === 'function') {
          this.props.onCameraError(error);
        }
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
    return new Promise((resolve, reject) => {
      this.libCameraPhoto.stopCamera()
        .then(() => {
          this.setState({isCameraStarted: false});
          if (typeof this.props.onCameraStop === 'function') {
            this.props.onCameraStop();
          }
          resolve();
        })
        .catch((error) => {
          if (typeof this.props.onCameraError === 'function') {
            this.props.onCameraError(error);
          }
          reject(error);
        });
    });
  }

  playClickAudio () {
    let audio = new Audio('data:audio/mp3;base64,' + clickSound.base64);
    audio.play();
  }

  handleTakePhoto () {
    const {sizeFactor, imageType, imageCompression, isImageMirror} = this.props;
    const configDataUri = { sizeFactor, imageType, imageCompression, isImageMirror };

    this.playClickAudio();

    let dataUri = this.libCameraPhoto.getDataUri(configDataUri);
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

  renderWhiteFlash (isShowWhiteFlash) {
    const flashDoTransition = isShowWhiteFlash ? 'do-transition' : '';
    const flashClasses = `${flashDoTransition} normal`;
    return (
      <div className={flashClasses}>
      </div>
    );
  }

  render () {
    const {isImageMirror} = this.props;
    let videoStyles = getVideoStyles(this.state.isShowVideo, isImageMirror);
    let showHideImgStyle = getShowHideStyle(!this.state.isShowVideo);

    return (
      <div className="react-html5-camera-photo">
        {this.renderWhiteFlash(!this.state.isShowVideo)}
        <img
          style={showHideImgStyle}
          alt="camera"
          src={this.state.dataUri}
        />
        <video
          style={videoStyles}
          ref={this.videoRef}
          autoPlay="true"
          playsInline
        />
        <CircleButton
          isClicked={!this.state.isShowVideo}
          onClick={this.handleTakePhoto}
        />
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
  isImageMirror: PropTypes.bool,
  imageCompression: PropTypes.number,
  isMaxResolution: PropTypes.bool,
  sizeFactor: PropTypes.number,
  onCameraStart: PropTypes.func,
  onCameraStop: PropTypes.func
};

Camera.defaultProps = { isImageMirror: true };
