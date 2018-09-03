import React from 'react';
import PropTypes from 'prop-types';

// for debugging with git cloned jslib-html5-camera-photo
// clone jslib-html5-camera-photo inside /src and replace
// from 'jslib-html5-camera-photo' -> from '../../../jslib-html5-camera-photo/src/lib';
import LibCameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo';

import CircleButton from '../CircleButton';
import WhiteFlash from '../WhiteFlash';
import DisplayError from '../DisplayError';

import {getShowHideStyle,
  getVideoStyles,
  isDynamicPropsUpdate,
  playClickAudio,
  printCameraInfo} from './helpers';
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
      isCameraStarted: false,
      startCameraErrorMsg: ''
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

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps (nextProps) {
    if (isDynamicPropsUpdate(this.props, nextProps)) {
      const {idealFacingMode, idealResolution, isMaxResolution} = nextProps;
      this.restartCamera(idealFacingMode, idealResolution, isMaxResolution);
    }
  }

  componentWillUnmount () {
    this.showVideoTimeout && clearInterval(this.showVideoTimeout);
    const isComponentWillUnmount = true;
    this.stopCamera(isComponentWillUnmount)
      .catch((error) => {
        printCameraInfo(error.message);
      });
  }

  restartCamera (idealFacingMode, idealResolution, isMaxResolution) {
    this.stopCamera()
      .then()
      .catch((error) => {
        printCameraInfo(error.message);
      })
      .then(() => {
        if (isMaxResolution) {
          this.startCameraMaxResolution(idealFacingMode);
        } else {
          this.startCameraIdealResolution(idealFacingMode, idealResolution);
        }
      });
  }

  startCamera (promiseStartCamera) {
    promiseStartCamera
      .then((stream) => {
        this.setState({
          isCameraStarted: true,
          startCameraErrorMsg: ''
        });
        if (typeof this.props.onCameraStart === 'function') {
          this.props.onCameraStart(stream);
        }
      })
      .catch((error) => {
        this.setState({startCameraErrorMsg: error.message});
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

  stopCamera (isComponentWillUnmount = false) {
    return new Promise((resolve, reject) => {
      this.libCameraPhoto.stopCamera()
        .then(() => {
          if (!isComponentWillUnmount) {
            this.setState({ isCameraStarted: false });
          }
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

  handleTakePhoto () {
    const {sizeFactor, imageType, imageCompression, isImageMirror} = this.props;
    const configDataUri = { sizeFactor, imageType, imageCompression, isImageMirror };

    playClickAudio();

    let dataUri = this.libCameraPhoto.getDataUri(configDataUri);
    this.props.onTakePhoto(dataUri);

    this.setState({
      dataUri,
      isShowVideo: false
    });

    this.showVideoTimeout && clearInterval(this.showVideoTimeout);
    this.showVideoTimeout = setTimeout(() => {
      this.setState({
        isShowVideo: true
      });
    }, 900);
  }

  render () {
    const {isImageMirror, isDisplayStartCameraError} = this.props;

    let videoStyles = getVideoStyles(this.state.isShowVideo, isImageMirror);
    let showHideImgStyle = getShowHideStyle(!this.state.isShowVideo);

    return (
      <div className="react-html5-camera-photo">
        <DisplayError
          cssClass={'display-error'}
          isDisplayError={isDisplayStartCameraError}
          errorMsg={this.state.startCameraErrorMsg}
        />
        <WhiteFlash
          isShowWhiteFlash={!this.state.isShowVideo}
        />
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
  isDisplayStartCameraError: PropTypes.bool,
  imageCompression: PropTypes.number,
  isMaxResolution: PropTypes.bool,
  sizeFactor: PropTypes.number,
  onCameraStart: PropTypes.func,
  onCameraStop: PropTypes.func
};

Camera.defaultProps = {
  isImageMirror: true,
  isDisplayStartCameraError: true
};
