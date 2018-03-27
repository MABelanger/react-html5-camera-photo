# react-html5-camera-photo

The first objective of this package comes from the need to have a react component that can capture picture from mobile or desktop camera through the browser with the HTML5 video and canvas elements.

## Requirement
React

## LiveDemo
[https://mabelanger.github.io/react-html5-camera-photo/](https://mabelanger.github.io/react-html5-camera-photo/)

## Installation

```bash
npm install --save react-html5-camera-photo
```

```bash
yarn add react-html5-camera-photo
```

Both Yarn and npm download packages from the npm registry.

## Getting started

The component need at minimum 3 parameters `ref`, `onCameraError` and `autoPlay`.

parameter | Description
--- | ---
**ref:** | The reference used to get the image URI with the call of getDataUri()
**onCameraError:** | The function called when error while opening the camera. Often the permission.
**autoPlay:** | Boolean value to start the first camera automatically when the component is loaded.

**Minimum ES6 example**
```js
import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataUri: ""
    };
  }

  onCameraError = (error) => {
    console.error(error)
  }

  setDataUri = () => {
    let dataUri = this.refs.camera.getDataUri();
    this.setState({dataUri});
  }

  render() {
    return (
      <div>
        <Camera
          ref="camera"
          onCameraError={this.onCameraError}
          autoPlay={true}
        />

        <button
          onClick={(e) => {
            this.setDataUri();
          }}
        >Photo</button>

        <img alt="camera" src={this.state.dataUri}/>
      </div>
    );
  }
}

export default App;
```

For more complex example checkout the demo [/src/demo/AppStandardUsage.js](./src/demo/AppStandardUsage.js):

## API
Function accessible by the `refs` ex:. "camera"

### Public API with refs
function | Description
--- | ---
**this.refs.camera.playFirstDevice():** | Function that start the camera with the first camera available often camera front.
**this.refs.camera.playLastDevice():** | Function that start the camera with the last camera available often camera back.
**this.refs.camera.getDataUri([sizeFactor]):** | Function that return the dataUri of the current frame of the camera. The sizeFactor is used to get a desired resolution. Example, a sizeFactor of 1 get the same resolution of the camera while sizeFactor of 0.5 get the half resolution of the camera. The sizeFactor can be between range of `]0, 1]` and the default value is `1`.
**this.refs.camera.stopStreams():** | Function that stop the camera.

### PropTypes
Properties | Type | Description
--- | --- | ---
**ref:** (optional) | string | The reference used to call the internal functions as [playFirstDevice(), getDataUri(), stopStreams()]
**onCameraError(error):** (required) | Event | Callback called with the error object as parameter when error occur while opening the camera. Often the permission.
**onCameraStop():** (optional) | Event | Callback called when the camera is stopped.
**onCameraStart():** (optional) | Event | Callback called when the camera is started.
**onVideoClick():** (optional) | Event | Callback called when the video is clicked.
**autoPlay:**  (optional, defaults to false) | boolean | Boolean value to start the first camera automatically when the component is loaded.

## ToDo
1. Select camera (front or back), right now it take by default the first camera available.
2. Get a list of supported resolution.
3. Force a resolution.
4. Use redux instead of refs ?

## FAQ
1. <b>What if i want to improve the code or add functionalities?</b>
  * Please take a look into the [CONTRIBUTING.md](CONTRIBUTING.md)
