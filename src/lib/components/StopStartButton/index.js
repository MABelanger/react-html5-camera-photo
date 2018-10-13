import React from 'react';
import PropTypes from 'prop-types';

import getDisplayErrorStyles from './styles';
// import './styles/closeButton.css';

export const CloseButton = ({ onClickStop, onClickStart, isOpen }) => {
  if (isOpen) {
    return (
      <div>
        <style>
          { getDisplayErrorStyles() }
        </style>
        <div id="container-close-button"
          onClick = {onClickStop}
        >Stop&nbsp;&#9724;
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <style>
          { getDisplayErrorStyles() }
        </style>
        <div id="container-close-button"
          onClick = {onClickStart}
        >Start&nbsp;&#9658;
        </div>
      </div>
    );
  }
};

CloseButton.propTypes = {
  onClickStart: PropTypes.func.isRequired,
  onClickStop: PropTypes.func.isRequired
};

export default CloseButton;
