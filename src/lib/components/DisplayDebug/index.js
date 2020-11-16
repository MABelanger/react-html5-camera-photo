import React from 'react';
import PropTypes from 'prop-types';

import './styles/displayDebug.css';

function isShowComponent (isDisplayDebug, debugMsg) {
  return (isDisplayDebug && debugMsg && debugMsg.length > 0);
}
export const DisplayDebug = ({ isDisplayDebug, debugMsg, cssClass }) => {
  if (!isShowComponent(isDisplayDebug, debugMsg)) {
    return null;
  }

  return (
    <div className={cssClass} id="display-debug">
      <h1>Camera debug: {debugMsg}</h1>
    </div>
  );
};

DisplayDebug.propTypes = {
  isDisplayDebug: PropTypes.bool,
  debugMsg: PropTypes.string,
  cssClass: PropTypes.string
};

export default DisplayDebug;
