import React, { Component } from 'react';
import Camera, { FACING_MODES } from '../lib';
import './reset.css';

/*
 * dynamic properties is : idealFacingMode, idealResolution, isMaxResolution
 * In this example we set the idealFacingMode
 */
class App extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      idealFacingMode: FACING_MODES.ENVIRONMENT
    };
    this.renderButtons = this.renderButtons.bind(this);
  }

  renderButtons () {
    return (
      <div>
        <button onClick={ (e) => {
          this.setState({idealFacingMode: FACING_MODES.USER});
        }}> FACING_MODES.USER </button>

        <button onClick={ (e) => {
          this.setState({idealFacingMode: FACING_MODES.ENVIRONMENT});
        }}> FACING_MODES.ENVIRONMENT </button>
      </div>
    );
  }

  render () {
    return (
      <div className="App">
        { this.renderButtons() }
        <Camera
          idealFacingMode = {this.state.idealFacingMode}
          onTakePhoto = { () => {} }
        />
      </div>
    );
  }
}

export default App;
