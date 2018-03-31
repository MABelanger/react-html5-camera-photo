import React from 'react'
import PropTypes from 'prop-types'

import './styles/circleButton.css';

export const CircleButton = ({ onClick }) => (
  <div onClick={onClick} id="outer-circle">
  bibi
    <div onClick={onClick} id="inner-circle">
    </div>
  </div>
)

CircleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CircleButton;
