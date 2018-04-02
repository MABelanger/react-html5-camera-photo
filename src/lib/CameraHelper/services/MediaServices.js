const SUPPORTED_FACING_MODE = ['user', 'environment', 'left', 'right'];

const FACING_MODE = {
  'USER' : 'user',
  'ENVIRONMENT': 'environment',
  'LEFT': 'left',
  'RIGHT': 'right'
}

const _getImageSize = (videoWidth, videoHeight, sizeFactor) => {

  console.log('videoWidth, videoHeight:', videoWidth, videoHeight);

  // calc the imageWidth
  let imageWidth = videoWidth * parseFloat(sizeFactor);
  // calc the ratio
  let ratio = videoWidth / imageWidth;
  // calc the imageHeight
  let imageHeight = videoHeight / ratio;

  console.log('imageWidth, imageHeight, sizeFactor:', imageWidth, imageHeight, sizeFactor);

  return {
    imageWidth,
    imageHeight
  };
}

class MediaServices {

  static getDataUri = (videoElement, sizeFactor) => {
    let {videoWidth, videoHeight} = videoElement;
    let {imageWidth, imageHeight} = _getImageSize(videoWidth, videoHeight, sizeFactor);

    // Build the canvas size et draw the image to context from videoElement
    let canvas = document.createElement('canvas');
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    let context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, imageWidth, imageHeight);

    // Get dataUri from canvas
    let dataUri = canvas.toDataURL('image/png');
    return dataUri;
  }


  static getWindowURL = () => {
    let windowURL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    return windowURL;
  }

  /*
  Inspiration : https://github.com/jhuckaby/webcamjs/blob/master/webcam.js
  */
  static getNavigatorMediaDevices = () => {
    let NMDevice = null;
    let isNewAPI = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    let isOldAPI = !!(navigator.mozGetUserMedia || navigator.webkitGetUserMedia);

    if(isNewAPI) {
      NMDevice = navigator.mediaDevices;

    } else if(isOldAPI){
      let NMDeviceOld = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
      // Setup getUserMedia, with polyfill for older browsers
  		// Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

      let polyfillGetUserMedia = {
        getUserMedia: function(c) {
          return new Promise(function(y, n) {
            NMDeviceOld.call(navigator, c, y, n);
          });
        }
      };

      // Overwrite getUserMedia() with the polyfill
      NMDevice = Object.assign(NMDeviceOld,
        polyfillGetUserMedia
      );
    }

    // If is no navigator.mediaDevices || navigator.mozGetUserMedia || navigator.webkitGetUserMedia
    // then is not supported so return null
    return NMDevice;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints
  static isSupportedFacingMode = () => {
     // navigator.mediaDevices
     return MediaServices.getNavigatorMediaDevices().getSupportedConstraints().facingMode;
  }

  static getIdealConstraints = (idealFacingMode={}, idealResolution={}) => {

    var idealConstraints = {
      audio: false,
      video: {}
    };

    // set facingMode
    if(SUPPORTED_FACING_MODE.indexOf(idealFacingMode) > -1) {
      idealConstraints.video.facingMode = { ideal: idealFacingMode };
    }

    // set width
    if(idealResolution.width){
      idealConstraints.video.width = { ideal: idealResolution.width };
    }

    // set height
    if(idealResolution.height){
      idealConstraints.video.height = { ideal: idealResolution.height };
    }

    return idealConstraints;
  }

  static get FACING_MODE() {
    return FACING_MODE;
  }

}

export default MediaServices;
