import Utilities from './services/Utilities';
import MediaUtils from './services/MediaUtils';

/*
Inspiration :
  https://www.html5rocks.com/en/tutorials/getusermedia/intro/
  https://github.com/samdutton/simpl/blob/gh-pages/getusermedia/sources/js/main.js
*/

export default class CameraHelper {

  constructor(videoElement, autoPlay) {
    this.videoElement = videoElement;
    this.autoPlay = autoPlay;
    this.videoInputs = [];
    this.stream = null;


    // Set the right object depending on the browser.
    this.windowURL = Utilities.getWindowURL();
    this.mediaDevices = MediaUtils.getNavigatorMediaDevices();
  }

  /*
   * private fct
   */
  _gotDevices = (deviceInfos) => {
    this.videoInputs = MediaUtils.getVideoInputs(deviceInfos);

    // Auto start the video if autoPlay is true
    if(this.autoPlay) {
      this.playEnvironmentDevice();
    }
  }

  _getStreamDevice = (facingMode, idealResolution) => {
    return new Promise((resolve, reject) => {
      // let desiredResolution = {
      //   width: 640,
      //   height: 480
      // }

      let idealConstraints = MediaUtils.getIdealConstraints(facingMode, idealResolution);
      this.mediaDevices.getUserMedia(idealConstraints)
          .then((stream) => {
            this._gotStream(stream);
            resolve(stream);
          })
          .catch((error) => {
            this.stopStreams();
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
  playUserDevice = (idealResolution={}) => {
    // stop the stream before playing it.
    this.stopStreams().catch(()=>{});

    let facingModeUser = null;
    if(MediaUtils.isSupportedFacingMode()){
      facingModeUser = MediaUtils.FACING_MODE.USER;
    }
    return this._getStreamDevice(facingModeUser, idealResolution);
  }

  playEnvironmentDevice = (idealResolution={}) => {
    // stop the stream before playing it.
    this.stopStreams().catch(()=>{});

    let facingModeEnvironment = null;
    if(MediaUtils.isSupportedFacingMode()){
      facingModeEnvironment = MediaUtils.FACING_MODE.ENVIRONMENT;
    }
    return this._getStreamDevice(facingModeEnvironment, idealResolution);
  }

  getDataUri = (sizeFactor=1) => {
    let dataUri = Utilities.getDataUri(this.videoElement, sizeFactor);
    return dataUri;
  }

  stopStreams = () => {
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

  enumerateDevice = () => {
    return new Promise((resolve, reject) => {
      this.mediaDevices.enumerateDevices()
        .then((deviceInfos) => {
          this._gotDevices(deviceInfos)
          resolve(deviceInfos)
        })
        .catch((error) => {
          this.stopStreams();
          reject(error)
        });
    });
  }
}
