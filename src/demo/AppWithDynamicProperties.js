import React, { useState } from 'react';
import Camera, { FACING_MODES } from '../lib';
import './reset.css';

/*
 * dynamic properties is : idealFacingMode, idealResolution, isMaxResolution
 * In this example we set the idealFacingMode
 */
function App (props) {
  const [idealFacingMode, setIdealFacingMode] = useState(null);
  const [isMaxResolution, setIsMaxResolution] = useState(false);

  function renderButtons () {
    return (
      <div>
        <button onClick={ (e) => {
          setIdealFacingMode(FACING_MODES.USER);
          setIsMaxResolution(false);
        }}> FACING_MODES.USER </button>

        <button onClick={ (e) => {
          setIdealFacingMode(FACING_MODES.ENVIRONMENT);
          setIsMaxResolution(true);
        }}> FACING_MODES.ENVIRONMENT & MaxResolution</button>
      </div>
    );
  }

  return (
    <div>
      { renderButtons() }
      <Camera
        idealFacingMode = {idealFacingMode}
        isMaxResolution = {isMaxResolution}
        onTakePhoto = { () => {} }
      />
    </div>
  );
}

export default App;
