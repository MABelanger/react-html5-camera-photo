import Utilities from './services/Utilities';

/*
Inspiration : https://www.html5rocks.com/en/tutorials/getusermedia/intro/
*/

export default class CameraHelper {

  constructor(videoElement, autoPlay) {
    this.videoElement = videoElement;
    this.autoPlay = autoPlay;
    this.videoInputs = [];
    this.stream = null;


    // Set the right object depending on the browser.
    this.windowURL = Utilities.getWindowURL();
    this.mediaDevices = Utilities.getNavigatorMediaDevices();
  }

  /*
   * private fct
   */
  _gotDevices = (deviceInfos) => {
    let videoInputs = [];
    for (let i = 0; i !== deviceInfos.length; ++i) {
      let deviceInfo = deviceInfos[i];
      if (deviceInfo.kind === 'videoinput') { // && deviceInfo.label.includes('back')
        videoInputs.push(deviceInfo);
      }
    }
    this.videoInputs = videoInputs;

    // Auto start the video if autoPlay is true
    if(this.autoPlay) {
      this.playLastDevice();
    }
  }

  _getStreamDevice = (deviceId) => {
    return new Promise((resolve, reject) => {
      let constraints = Utilities.getConstraints(deviceId);
      this.mediaDevices.getUserMedia(constraints)
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
  playFirstDevice = () => {
    // stop the stream before playing it.
    this.stopStreams().catch(()=>{});
    let firstDevice = this.videoInputs[0];
    return this._getStreamDevice(firstDevice.deviceId);
  }

  playLastDevice = () => {
    // stop the stream before playing it.
    this.stopStreams().catch(()=>{});
    let lastIndex = this.videoInputs.length -1;
    let lastDevice = this.videoInputs[ lastIndex ];
    return this._getStreamDevice(lastDevice.deviceId);
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
