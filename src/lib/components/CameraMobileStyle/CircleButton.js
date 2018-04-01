import React from 'react';
import PropTypes from 'prop-types';

import './styles/circleButton.css';

export const CircleButton = ({ onClick }) => (
  <div className="container-circles">
    <div onClick={onClick} id="outer-circle">
      <div id="inner-circle">
      </div>
    </div>
  </div>
)

CircleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CircleButton;
