import MediaServices from './services/MediaServices';

/*
Inspiration :
  https://www.html5rocks.com/en/tutorials/getusermedia/intro/
  https://github.com/samdutton/simpl/blob/gh-pages/getusermedia/sources/js/main.js
*/

export default class CameraHelper {

  constructor(videoElement, autoPlay) {
    this.videoElement = videoElement;
    this.autoPlay = autoPlay;
    this.stream = null;

    // Set the right object depending on the browser.
    this.windowURL = MediaServices.getWindowURL();
    this.mediaDevices = MediaServices.getNavigatorMediaDevices();
  }

  /*
   * private fct
   */
  _gotDevices = (deviceInfos) => {
    // Auto start the video if autoPlay is true
    if(this.autoPlay) {
      this.playEnvironmentDevice();
    }
  }

  _getStreamDevice = (facingMode, idealResolution) => {
    return new Promise((resolve, reject) => {
      let idealConstraints = MediaServices.getIdealConstraints(facingMode, idealResolution);
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
    if(MediaServices.isSupportedFacingMode()){
      facingModeUser = MediaServices.FACING_MODE.USER;
    }
    return this._getStreamDevice(facingModeUser, idealResolution);
  }

  playEnvironmentDevice = (idealResolution={}) => {
    // stop the stream before playing it.
    this.stopStreams().catch(()=>{});

    let facingModeEnvironment = null;
    if(MediaServices.isSupportedFacingMode()){
      facingModeEnvironment = MediaServices.FACING_MODE.ENVIRONMENT;
    }
    return this._getStreamDevice(facingModeEnvironment, idealResolution);
  }

  getDataUri = (sizeFactor=1) => {
    let dataUri = MediaServices.getDataUri(this.videoElement, sizeFactor);
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
