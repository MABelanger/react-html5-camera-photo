import React from 'react';
import PropTypes from 'prop-types';

import './styles/displayError.css';

function isShowComponent (isDisplayError, errorMsg) {
  return (isDisplayError && errorMsg && errorMsg.length > 0);
}
export const DisplayError = ({ isDisplayError, errorMsg, cssClass }) => {
  if (!isShowComponent(isDisplayError, errorMsg)) {
    return null;
  }

  console.log('cssClass', cssClass);
  return (
    <div className={cssClass} id="display-error">
      <h1>Camera error: {errorMsg}</h1>
    </div>
  );
};

DisplayError.propTypes = {
  isDisplayError: PropTypes.bool,
  errorMsg: PropTypes.string,
  cssClass: PropTypes.string
};

export default DisplayError;
