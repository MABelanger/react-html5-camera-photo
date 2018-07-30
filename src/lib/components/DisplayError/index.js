import React from 'react';
import PropTypes from 'prop-types';

import './styles/displayError.css';

function isShowComponent (isDisplayError, errorMsg) {
  return (isDisplayError && errorMsg && errorMsg.length > 0);
}
export const DisplayError = ({ isDisplayError, errorMsg }) => {
  if (!isShowComponent(isDisplayError, errorMsg)) {
    return null;
  }

  return (
    <div id="display-error" className="display-error">
      <h1>Camera error: {errorMsg}</h1>
    </div>
  );
};

DisplayError.propTypes = {
  isDisplayError: PropTypes.bool,
  errorMsg: PropTypes.string
};

export default DisplayError;
