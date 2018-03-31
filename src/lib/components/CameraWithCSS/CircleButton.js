import React from 'react'
import PropTypes from 'prop-types'

import './styles/circleButton.css';

export const CircleButton = ({ onVideoClick }) => (
  <div onClick={onVideoClick} id="outer-circle">
  bibi
    <div onClick={onVideoClick} id="inner-circle">
    </div>
  </div>
)

CircleButton.propTypes = {

};

export default CircleButton;
