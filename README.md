# react-html5-camera-photo

The first objective of this package comes from the need to get the same look and feal of a native mobile camera app but with a react component.
For those who want to build with their own css and need an abstraction of `getUserMedia()` take a look of [jslib-html5-camera-photo](https://github.com/mabelanger/jslib-html5-camera-photo) with react.

## Requirement
React

## LiveDemo
[Demo of react-html5-camera-photo](https://mabelanger.github.io/react-html5-camera-photo/)

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
**onCameraError(error):** | Event function called when error while opening the camera. Often the permission.
**onTakePhoto(dataUri):** | Event function called when a photo is taken. the dataUri is passed as a parameter.


**Minimum ES6 example**
```js
import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';

class App extends Component {
  onCameraError (error) {
    let {code, message, name} = error;
    let strError = `Camera Error: code: ${code} message: ${message} name: ${name}`;
    console.error(strError);
  }

  onTakePhoto (dataUri) {
    // Do stuff with the dataUri photo...
    console.log('takePhoto');
  }

  render () {
    return (
      <div className="App">
        <Camera
          onCameraError = {this.onCameraError}
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
        />
      </div>
    );
  }
}

export default App;
```

For more complex example checkout the demo [/src/demo/AppStandardUsage.js](./src/demo/AppStandardUsage.js):

## API

### PropTypes
Properties | Type | Description
--- | --- | ---
**onCameraError(error):** (required) | Event | Callback called with the error object as parameter when error occur while opening the camera. Often the permission.
**onCameraStart():** (optional) | Event | Callback called when the camera is started.
**onTakePhoto(dataUri):** (required) | Event | The function called when a photo is taken. the dataUri is passed as a parameter.
**idealFacingMode** (Optional) | String | The ideal facing mode of the camera, `environment` or `user`, the default is the default of the browser.
**idealResolution** (Optional) | Object | Object of the ideal resolution of the camera, `{width: Integer, height: Integer}`, the default is the default of the browser.
**sizeFactor** (Optional) | Number | Number of the factor resolution. Example, a sizeFactor of `1` get the same resolution of the camera while sizeFactor of `0.5` get the half resolution of the camera. The sizeFactor can be between range of `]0, 1]` and the default value is `1`.

## FAQ
1. <b>What if i want to improve the code or add functionalities?</b>
  * Please take a look into the [CONTRIBUTING.md](CONTRIBUTING.md)
