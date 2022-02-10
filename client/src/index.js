import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './css/index.css'

if(module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <React.StrictMode>

    <App />
    
  </React.StrictMode>,
  document.getElementById('root')
);


