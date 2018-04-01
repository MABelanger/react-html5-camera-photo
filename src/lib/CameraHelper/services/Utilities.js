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

class Utilities {

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

  /*
   * Resolution spect : https://webrtchacks.com/getusermedia-resolutions-3/
   */
  static getConstraints = (deviceId) => {
    let constraints = {
      audio: false,
      video: {
        optional: [
          {sourceId: deviceId},

          // {minWidth: 640},
          // {minWidth: 800},
          // {minWidth: 900},
          // {minWidth: 1024},
          // {minWidth: 1280},
          // {minWidth: 1920},
          // {minWidth: 2560}
        ]
      }
    };

    // if deviceId add it to the constraints
    if(deviceId) {
      constraints.video.optional.unshift({sourceId: deviceId})
    }

    return constraints;
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

  static getWindowURL = () => {
    let windowURL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    return windowURL;
  }

}

export default Utilities;
