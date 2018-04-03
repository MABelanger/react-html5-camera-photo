import React from 'react';
import ReactDOM from 'react-dom';
//import App from './AppMinimalUsage';
import App from './AppStandardUsage';
//import App from './AppCameraMobileStyle';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
