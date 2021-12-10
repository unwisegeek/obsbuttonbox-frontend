import React from 'react';
import ReactDOM from 'react-dom';
import AdmiralAppBar from './interface.js'
import { info } from './storage.js'

info.clear();

ReactDOM.render(
  <AdmiralAppBar />,
  document.getElementById('root')
);
