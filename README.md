# react-html5-camera-photo

The first objective of this package comes from the need to get the same look and feel of a native mobile camera app but with a react component.
For those who want to build with their own css and need an abstraction of `getUserMedia()` take a look of [jslib-html5-camera-photo](https://github.com/mabelanger/jslib-html5-camera-photo) with react.

## Requirement
- react: >=16.0.0
- react-dom: >=16.0.0

## LiveDemo
[Demo of react-html5-camera-photo](https://mabelanger.github.io/react-html5-camera-photo/)

## Required Working Environment for getUserMedia()

- **https or localhost** : The `getUserMedia()` method is only available in secure contexts `(https or localhost)`. If a document isn't loaded in a secure context, the navigator.mediaDevices property is undefined, making access to getUserMedia() impossible. Attempting to access `getUserMedia()` in this situation will result in a TypeError. See [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Security)

- **iOS >= 11 WebRTC issue with webkit (Chrome & Firefox)** : Apple restricts WebRTC to **Safari only** so it mean that you can't use the `getUserMedia()` with Firefox and Chrome. So `getUserMedia()` is not supported yet, for "security reasons". See [Stackoverflow](https://stackoverflow.com/questions/45055329/does-webkit-in-ios-11-beta-support-webrtc)


## Installation

```bash
npm install --save react-html5-camera-photo
```

```bash
yarn add react-html5-camera-photo
```

Both Yarn and npm download packages from the npm registry.

## Getting started

parameter | Description
--- | ---
**onTakePhoto(dataUri):** | Event function called when a photo is taken. the dataUri is passed as a parameter.


**Minimum ES6 example**
```js
import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class App extends Component {
  onTakePhoto (dataUri) {
    // Do stuff with the dataUri photo...
    console.log('takePhoto');
  }

  render () {
    return (
      <div className="App">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
        />
      </div>
    );
  }
}

export default App;
```

## API

### PropTypes
Properties | Type | Description
--- | --- | ---
**onCameraStart():** (optional) | Event | Callback called when the camera is started.
**onCameraStop():** (optional) | Event | Callback called when the camera is stopped.
**onCameraError(error):** (Optional) | Event | Callback called with the error object as parameter when error occur while opening the camera. Often the permission.
**onTakePhoto(dataUri):** (required) | Event | The function called when a photo is taken. the dataUri is passed as a parameter.
**idealFacingMode:** (Optional) (Dynamic) | String | The ideal facing mode of the camera, `environment` or `user`, the default is the default of the browser. Use `FACING_MODES` constant to get the right string. Example :. FACING_MODES.ENVIRONMENT or FACING_MODES.USER
**idealResolution:** (Optional) (Dynamic) | Object | Object of the ideal resolution of the camera, `{width: Integer, height: Integer}`, the default is the default of the browser.
**isMaxResolution:** (Optional) (Dynamic) | Boolean | If is true, the camera will start with his own maximum resolution, the default is false.
**isImageMirror:** (Optional) | Boolean | If is true, the camera image will be mirror, the default is true.
**isSilentMode:**(Optional) | Boolean | If is true, the camera do not play click sound when the photo was taken, the default is false.
**isFullscreen:** (Optional) | Boolean | If is true, the camera image will be set fullscreen to force the maximum width and height of the viewport, the default is false.
**isDisplayStartCameraError:** (Optional) | Boolean | If is true, if the camera start with error, it will show the error between **h1** tag on the top of the component. Useful to notify the user about permission error, the default is true.
**sizeFactor:** (Optional) | Number | Number of the factor resolution. Example, a sizeFactor of `1` get the same resolution of the camera while sizeFactor of `0.5` get the half resolution of the camera. The sizeFactor can be between range of `]0, 1]` and the default value is `1`.
**imageType:**: (Optional) | String | String used to get the desired image type between `jpg` or `png`. to specify the imageType use the constant IMAGE_TYPES, for example to specify jpg format use IMAGE_TYPES.JPG. The default imageType is `png`. Use `IMAGE_TYPES` constant to get the right image type Example:. IMAGE_TYPES.JPG or IMAGE_TYPES.PNG
**imageCompression:**: (Optional) | Number | Number used to get the desired compression when `jpg` is selected. choose a compression between `[0, 1]`, 1 is maximum, 0 is minimum. The default value imageCompression is `0.92`.


**Dynamic** : If the prop is dynamic, it mean that you can change that prop dynamically without umount the component (removing it). You can do it by a setState() inside the parent component. Checkout the demo example: [./src/demo/AppWithDynamicProperties.js](./src/demo/AppWithDynamicProperties.js)

## Example with all props used
```js
import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class App extends Component {
  onTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  onCameraError (error) {
    console.error('onCameraError', error);
  }

  onCameraStart (stream) {
    console.log('onCameraStart');
  }

  onCameraStop () {
    console.log('onCameraStop');
  }

  render () {
    return (
      <div className="App">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          onCameraError = { (error) => { this.onCameraError(error); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 640, height: 480}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.97}
          isMaxResolution = {false}
          isImageMirror = {false}
          isSilentMode = {true}
          isDisplayStartCameraError = {true}
          isFullscreen = {true}
          sizeFactor = {1}
          onCameraStart = { (stream) => { this.onCameraStart(stream); } }
          onCameraStop = { () => { this.onCameraStop(); } }
        />
      </div>
    );
  }
}

export default App;
```

## Bug report (issues)
Before sending a bug report of camera error, make sure that `getUserMedia()` is supported by your browser. Please test your camera on : [DetectRTC | Is WebRTC Supported In Your Browser?](https://www.webrtc-experiment.com/DetectRTC/) If the `System has Webcam is supported`, please send the screenshot of the first 7 first rows of the table.

## FAQ
1. <b>What if i want to improve the code or add functionalities?</b>
  * Please take a look into the [CONTRIBUTING.md](CONTRIBUTING.md)
