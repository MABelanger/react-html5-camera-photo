import React, { Component } from 'react';
import Camera from '../lib';

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
