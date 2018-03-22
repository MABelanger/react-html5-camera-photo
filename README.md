# react-html5-camera-photo

The first objective of this package comes from the need to have a react component that can capture picture from mobile or desktop camera through the browser with the HTML5 video and canvas elements.

## Requirement
React

## LiveDemo
[https://mabelanger.github.io/react-html5-camera-photo/](https://mabelanger.github.io/react-html5-camera-photo/){:target="_blank"}

## Installation

```bash
npm install --save react-html5-camera-photo
```

```bash
yarn add react-html5-camera-photo
```

Both Yarn and npm download packages from the npm registry.

## Getting started

The component need at minimum 3 parameters `ref`, `handleError` and `autoPlay`.

parameter | Description
--- | ---
**ref:** | The reference used to get the image URI with the call of getDataUri()
**handleError:** | The function called when error while opening the camera. Often the permission.
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

  handleError = (error) => {
    console.error(error)
  }

  getDataUri = () => {
    let dataUri = this.refs.camera.getDataUri();
    this.setState({dataUri});
  }

  render() {
    return (
      <div>
        <Camera
          ref="camera"
          handleError={this.handleError}
          autoPlay={true}
        />

        <button
          onClick={(e) => {
            this.getDataUri();
          }}
        >Photo</button>

        <img alt="camera" src={this.state.dataUri}/>
      </div>
    );
  }
}

export default App;
```

## API


## FAQ
1. <b>What if i want to improve the code or add functionalities?</b>
  * Please take a look into the [CONTRIBUTING.md](CONTRIBUTING.md)
