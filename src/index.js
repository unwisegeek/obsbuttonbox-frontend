import React from 'react';
import ReactDOM from 'react-dom';
import AdmiralAppBar from './interface.js'
import { info } from './storage.js'

info.clear('sounds_available')
info.clear('triggers_available')

ReactDOM.render(
  <AdmiralAppBar />,
  document.getElementById('root')
);
