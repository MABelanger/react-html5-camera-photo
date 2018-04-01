import React from 'react';
import PropTypes from 'prop-types';

import './styles/circleButton.css';

export const CircleButton = ({ onClick }) => (
  <div id="container-container">
    <div id="container-circles">
      <div onClick={onClick} id="outer-circle">
        <div onClick={onClick} id="inner-circle">
        </div>
      </div>
    </div>
  </div>
)

CircleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CircleButton;
