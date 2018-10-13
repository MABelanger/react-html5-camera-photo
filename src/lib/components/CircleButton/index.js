import React from 'react';
import PropTypes from 'prop-types';

import getCircleButtonStyles from './styles';
// import './styles/circleButton.css';

export const CircleButton = ({ onClick, isClicked }) => {
  const innerCircleClasses = isClicked ? 'is-clicked' : '';
  return (
    <div>
      <style>
        { getCircleButtonStyles() }
      </style>
      <div id="container-circles">
        <div
          id="outer-circle"
          onClick = {
            (e) => {
              if (!isClicked) {
                onClick();
              }
            }
          }
        >
          <div id="inner-circle" className={innerCircleClasses}>
          </div>
        </div>
      </div>
    </div>
  );
};

CircleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired
};

export default CircleButton;
