# react-html5-camera-photo

The first objective of this package comes from the need to get the same look and feel of a native mobile camera app but with a react component.
For those who want to build with their own css and need an abstraction of `getUserMedia()` take a look of [jslib-html5-camera-photo](https://github.com/mabelanger/jslib-html5-camera-photo) with react.

## Requirement
- react: >=16.8.0
- react-dom: >=16.8.0

## LiveDemo
[Demo of react-html5-camera-photo](https://mabelanger.github.io/react-html5-camera-photo/)

## Required Working Environment for getUserMedia()

- **https or localhost** : The `getUserMedia()` method is only available in secure contexts `(https or localhost)`. If a document isn't loaded in a secure context, the navigator.mediaDevices property is undefined, making access to getUserMedia() impossible. Attempting to access `getUserMedia()` in this situation will result in a TypeError. See [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Privacy_and_security)

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
import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function App (props) {
  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  return (
    <Camera
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
    />
  );
}

export default App;
```

## API

### PropTypes
Properties | Type | Default | Description
--- | --- | --- | ---
**onCameraStart():** (optional) | Event || Callback called when the camera is started.
**onCameraStop():** (optional) | Event || Callback called when the camera is stopped.
**onCameraError(error):** (Optional) | Event || Callback called with the error object as parameter when error occur while opening the camera. Often the permission.
**onTakePhoto(dataUri):** (Optional) | Event || The function called when a photo is taken. the dataUri is passed as a parameter.
**onTakePhotoAnimationDone(dataUri):** (Optional) | Event || The function called when a photo is taken and the animation is done. the dataUri is passed as a parameter.
**idealFacingMode:** (Optional) (Dynamic) | String | Browser default | The ideal facing mode of the camera, `environment` or `user`. Use `FACING_MODES` constant to get the right string. Example :. FACING_MODES.ENVIRONMENT or FACING_MODES.USER
**idealResolution:** (Optional) (Dynamic) | Object | Browser default | Object of the ideal resolution of the camera, `{width: Integer, height: Integer}`.
**isMaxResolution:** (Optional) (Dynamic) | Boolean | false | If is true, the camera will start with his own maximum resolution.
**isImageMirror:** (Optional) | Boolean | true | If is true, the camera image will be mirror.
**isSilentMode:**(Optional) | Boolean | false | If is true, the camera do not play click sound when the photo was taken.
**isFullscreen:** (Optional) | Boolean | false | If is true, the camera image will be set fullscreen to force the maximum width and height of the viewport.
**isDisplayStartCameraError:** (Optional) | Boolean | true | If is true, if the camera start with error, it will show the error between **h1** tag on the top of the component. Useful to notify the user about permission error.
**sizeFactor:** (Optional) | Number | 1 | Number of the factor resolution. Example, a sizeFactor of `1` get the same resolution of the camera while sizeFactor of `0.5` get the half resolution of the camera. The sizeFactor can be between range of `]0, 1]`.
**imageType:**: (Optional) | String | png | String used to get the desired image type between `jpg` or `png`. to specify the imageType use the constant IMAGE_TYPES, for example to specify jpg format use IMAGE_TYPES.JPG. Use `IMAGE_TYPES` constant to get the right image type Example:. IMAGE_TYPES.JPG or IMAGE_TYPES.PNG
**imageCompression:**: (Optional) | Number | 0.92 | Number used to get the desired compression when `jpg` is selected. choose a compression between `[0, 1]`, 1 is maximum, 0 is minimum.


**Dynamic** : If the prop is dynamic, it mean that you can change that prop dynamically without umount the component (removing it). You can do it by a setState() inside the parent component. Checkout the demo example: [./src/demo/AppWithDynamicProperties.js](./src/demo/AppWithDynamicProperties.js)

## Example of closing the camera and image preview after take a photo
Probably the typical usage of using this component is to preview the image and close the camera after take a photo. You can take a look of all the code including the **ImagePreview** component here : [./src/demo/AppWithImagePreview](./src/demo/AppWithImagePreview)

```js
import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import ImagePreview from './ImagePreview'; // source code : ./src/demo/AppWithImagePreview/ImagePreview

function App (props) {
  const [dataUri, setDataUri] = useState('');

  function handleTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    setDataUri(dataUri);
  }

  const isFullscreen = false;
  return (
    <div>
      {
        (dataUri)
          ? <ImagePreview dataUri={dataUri}
            isFullscreen={isFullscreen}
          />
          : <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
            isFullscreen={isFullscreen}
          />
      }
    </div>
  );
}

export default App;
```

## Example with all props used
```js
import React from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function App (props) {
  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }

  function handleCameraStart (stream) {
    console.log('handleCameraStart');
  }

  function handleCameraStop () {
    console.log('handleCameraStop');
  }

  return (
    <Camera
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
      onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
      onCameraError = { (error) => { handleCameraError(error); } }
      idealFacingMode = {FACING_MODES.ENVIRONMENT}
      idealResolution = {{width: 640, height: 480}}
      imageType = {IMAGE_TYPES.JPG}
      imageCompression = {0.97}
      isMaxResolution = {true}
      isImageMirror = {false}
      isSilentMode = {false}
      isDisplayStartCameraError = {true}
      isFullscreen = {false}
      sizeFactor = {1}
      onCameraStart = { (stream) => { handleCameraStart(stream); } }
      onCameraStop = { () => { handleCameraStop(); } }
    />
  );
}

export default App;
```

## Bug report (issues)
Before sending a bug report of camera error, make sure that `getUserMedia()` is supported by your browser. Please test your camera on : [DetectRTC | Is WebRTC Supported In Your Browser?](https://www.webrtc-experiment.com/DetectRTC/) If the `System has Webcam is supported`, please send the screenshot of the first 7 first rows of the table.

## FAQ
1. <b>What if i want to improve the code or add functionalities?</b>
  * Please take a look into the [CONTRIBUTING.md](CONTRIBUTING.md)
