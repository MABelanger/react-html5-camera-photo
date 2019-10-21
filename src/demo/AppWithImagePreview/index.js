import React, { Component } from 'react';
import { Camera } from '../../lib';
import ImagePreview from './ImagePreview';
import '../reset.css';

class App extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = { dataUri: null };
    this.onTakePhotoAnimationDone = this.onTakePhotoAnimationDone.bind(this);
  }

  onTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    this.setState({ dataUri });
  }

  render () {
    const isFullscreen = false;

    return (
      <div className="App">
        {
          (this.state.dataUri)
            ? <ImagePreview dataUri={this.state.dataUri}
              isFullscreen={isFullscreen}
            />
            : <Camera onTakePhotoAnimationDone = {this.onTakePhotoAnimationDone}
              isFullscreen={isFullscreen}
            />
        }
      </div>
    );
  }
}

export default App;
