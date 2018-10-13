import React from 'react';
import PropTypes from 'prop-types';

import getWhiteFlashStyles from './styles';
// import './styles/whiteFlash.css';

export const WhiteFlash = ({ isShowWhiteFlash }) => {
  const flashDoTransition = isShowWhiteFlash ? 'do-transition' : '';
  const flashClasses = `${flashDoTransition} normal`;

  return (
    <div>
      <style>
        { getWhiteFlashStyles() }
      </style>
      <div id="white-flash" className={flashClasses}>
      </div>
    </div>
  );
};

WhiteFlash.propTypes = {
  isShowWhiteFlash: PropTypes.bool.isRequired
};

export default WhiteFlash;
