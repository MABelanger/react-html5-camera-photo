import MediaServices from './services/MediaServices';

/*
Inspiration :
  https://www.html5rocks.com/en/tutorials/getusermedia/intro/
  https://github.com/samdutton/simpl/blob/gh-pages/getusermedia/sources/js/main.js
*/

class CameraHelper {

  constructor(videoElement) {
    this.videoElement = videoElement;
    this.stream = null;

    // Set the right object depending on the browser.
    this.windowURL = MediaServices.getWindowURL();
    this.mediaDevices = MediaServices.getNavigatorMediaDevices();

  }

  /*
   * private fct
   */
  _getStreamDevice = (idealFacingMode, idealResolution) => {
    return new Promise((resolve, reject) => {
      let idealConstraints = MediaServices.getIdealConstraints(idealFacingMode, idealResolution);
      this.mediaDevices.getUserMedia(idealConstraints)
          .then((stream) => {
            this._gotStream(stream);
            resolve(stream);
          })
          .catch((error) => {
            this.stopDevice();
            reject(error);
          });
    });
  }

  _setVideoSrc = (stream) => {
    if ("srcObject" in this.videoElement) {
      this.videoElement.srcObject = stream;
    }
    else {
      // using URL.createObjectURL() as fallback for old browsers
      let videoSrc = this.windowURL.createObjectURL(stream);
      this.videoElement.src = videoSrc;
    }
  }

  _gotStream = (stream) => {
    this.stream = stream;
    this._setVideoSrc(stream);
  }

  /*
   * public fct
   */

  playDevice = (idealFacingMode={}, idealResolution={}) => {
    // stop the stream before playing it.
    this.stopDevice().catch(()=>{});
    return this._getStreamDevice(idealFacingMode, idealResolution);
  }

  getDataUri = (sizeFactor=1) => {
    let dataUri = MediaServices.getDataUri(this.videoElement, sizeFactor);
    return dataUri;
  }

  stopDevice = () => {
    return new Promise((resolve, reject) => {
      if (this.stream) {
        this.stream.getTracks().forEach(function(track) {
          track.stop();
        });
        this.videoElement.src = "";
        this.stream = null;
        resolve();
      }
      reject("no stream to stop!")
    });
  }

}

export const FACING_MODES = MediaServices.FACING_MODES;

export default CameraHelper;
