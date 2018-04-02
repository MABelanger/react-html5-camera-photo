const SUPPORTED_FACING_MODE = ['user', 'environment', 'left', 'right'];

const FACING_MODE = {
  'USER' : 'user',
  'ENVIRONMENT': 'environment',
  'LEFT': 'left',
  'RIGHT': 'right'
}

class Constraints {

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
     return Constraints.getNavigatorMediaDevices().getSupportedConstraints().facingMode;
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

  // https://www.w3.org/TR/mediacapture-streams/#def-constraint-facingMode
  static getVideoInputs = (deviceInfos) => {
    let videoInputs = [];
    for (let i = 0; i !== deviceInfos.length; ++i) {
      let deviceInfo = deviceInfos[i];
      console.log(deviceInfo)
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/kind
      if (deviceInfo.kind === 'videoinput') { // && deviceInfo.label.includes('back')
        videoInputs.push(deviceInfo);
      }
    }
    return videoInputs;
  }

  static get FACING_MODE() {
    return FACING_MODE;
  }

}

export default Constraints;
