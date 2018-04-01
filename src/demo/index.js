import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppStandardUsage';
//import App from './AppCameraWithCSS';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
