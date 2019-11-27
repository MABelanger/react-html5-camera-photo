import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

// for debugging with git cloned jslib-html5-camera-photo
// clone jslib-html5-camera-photo inside /src and replace
// from 'jslib-html5-camera-photo' -> from '../../../jslib-html5-camera-photo/src/lib';
import { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo';

import { useLibCameraPhoto } from './hooks/useLibCameraPhoto';

import CircleButton from '../CircleButton';
import WhiteFlash from '../WhiteFlash';
import DisplayError from '../DisplayError';
import {
  getShowHideStyle,
  getVideoStyles,
  playClickAudio,
  printCameraInfo
} from './helpers';

import './styles/camera.css';

let showVideoTimeoutId = null;

/*
Inspiration : https://www.html5rocks.com/en/tutorials/getusermedia/intro/
*/
function Camera (props) {
  const [dataUri, setDataUri] = useState('');
  const [isShowVideo, setIsShowVideo] = useState(true);
  const [cameraStartDisplayError, setCameraStartDisplayError] = useState('');

  let videoRef = useRef(null);

  const [
    mediaStream,
    cameraStartError,
    cameraStopError,
    getDataUri
  ] = useLibCameraPhoto(videoRef, props.idealFacingMode, props.idealResolution, props.isMaxResolution);

  useEffect(() => {
    if (mediaStream) {
      if (typeof props.onCameraStart === 'function') {
        props.onCameraStart(mediaStream);
      }
    } else {
      if (typeof props.onCameraStop === 'function') {
        props.onCameraStop();
      }
    }
  }, [mediaStream]);

  useEffect(() => {
    if (cameraStartError) {
      setCameraStartDisplayError(`${cameraStartError.name} ${cameraStartError.message}`);
      if (typeof props.onCameraError === 'function') {
        props.onCameraError(cameraStartError);
      }
    }
  }, [cameraStartError]);

  useEffect(() => {
    if (cameraStopError) {
      printCameraInfo(cameraStopError.message);
    }
  }, [cameraStopError]);

  function clearShowVideoTimeout () {
    if (showVideoTimeoutId) {
      clearTimeout(showVideoTimeoutId);
    }
  }

  function handleTakePhoto () {
    const configDataUri = {
      sizeFactor: props.sizeFactor,
      imageType: props.imageType,
      imageCompression: props.imageCompression,
      isImageMirror: props.isImageMirror
    };

    let dataUri = getDataUri(configDataUri);

    if (!props.isSilentMode) {
      playClickAudio();
    }

    if (typeof props.onTakePhoto === 'function') {
      props.onTakePhoto(dataUri);
    }

    setDataUri(dataUri);
    setIsShowVideo(false);

    clearShowVideoTimeout();
    showVideoTimeoutId = setTimeout(() => {
      setIsShowVideo(true);

      if (typeof props.onTakePhotoAnimationDone === 'function') {
        props.onTakePhotoAnimationDone(dataUri);
      }
    }, 900);
  }

  let videoStyles = getVideoStyles(isShowVideo, props.isImageMirror);
  let showHideImgStyle = getShowHideStyle(!isShowVideo);

  let classNameFullscreen = props.isFullscreen ? 'react-html5-camera-photo-fullscreen' : '';
  return (
    <div className={'react-html5-camera-photo ' + classNameFullscreen}>
      <DisplayError
        cssClass={'display-error'}
        isDisplayError={props.isDisplayStartCameraError}
        errorMsg={cameraStartDisplayError}
      />
      <WhiteFlash
        isShowWhiteFlash={!isShowVideo}
      />
      <img
        style={showHideImgStyle}
        alt="camera"
        src={dataUri}
      />
      <video
        style={videoStyles}
        ref={videoRef}
        autoPlay={true}
        muted="muted"
        playsInline
      />
      <CircleButton
        isClicked={!isShowVideo}
        onClick={handleTakePhoto}
      />
    </div>
  );
}

export {
  Camera,
  FACING_MODES,
  IMAGE_TYPES
};

export default Camera;

Camera.propTypes = {
  onTakePhoto: PropTypes.func,
  onTakePhotoAnimationDone: PropTypes.func,
  onCameraError: PropTypes.func,
  idealFacingMode: PropTypes.string,
  idealResolution: PropTypes.object,
  imageType: PropTypes.string,
  isImageMirror: PropTypes.bool,
  isSilentMode: PropTypes.bool,
  isDisplayStartCameraError: PropTypes.bool,
  imageCompression: PropTypes.number,
  isMaxResolution: PropTypes.bool,
  isFullscreen: PropTypes.bool,
  sizeFactor: PropTypes.number,
  onCameraStart: PropTypes.func,
  onCameraStop: PropTypes.func
};

Camera.defaultProps = {
  isImageMirror: true,
  isDisplayStartCameraError: true
};
