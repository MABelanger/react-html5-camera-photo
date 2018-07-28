import React from 'react';
import PropTypes from 'prop-types';
import './styles/whiteFlash.css';

export const WhiteFlash = ({ isShowWhiteFlash }) => {
  const flashDoTransition = isShowWhiteFlash ? 'do-transition' : '';
  const flashClasses = `${flashDoTransition} normal`;

  return (
    <div id="white-flash" className={flashClasses}>
    </div>
  );
};

WhiteFlash.propTypes = {
  isShowWhiteFlash: PropTypes.bool.isRequired
};

export default WhiteFlash;
