import React from 'react'
import PropTypes from 'prop-types'

import {CameraJs} from '../CameraJs';
import CircleButton from './CircleButton';

export default class CameraWithCSS extends React.Component {

  render() {
    return (
      <div className="camera">
        <video
          ref="video"
          autoPlay="true"
        />
        <CircleButton onVideoClick={this.props.onVideoClick}/>
      </div>
    );
  }
}
