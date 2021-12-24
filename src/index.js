import React from 'react';
import ReactDOM from 'react-dom';
import AdmiralAppBar from './interface.js'
import { info, getAPI } from './storage.js'

const config = require('./config.js');
var api = `http://${config["api_host"]}:${config["api_port"]}`;

info.clear('sounds_available')
info.clear('triggers_available')

async function getSoundsandAutos() {
  await getAPI(`${api}/api/sounds-available`).then((data) => {
    info.setItem('sounds_available', data);
  });
  await getAPI(`${api}/api/automation/triggers`)
    .then((data) => {
      info.setItem('triggers_available', data)
    });
}

getSoundsandAutos().then(
  ReactDOM.render(
    <AdmiralAppBar />,
    document.getElementById('root'))
  )


