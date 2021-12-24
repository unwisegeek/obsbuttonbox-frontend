import * as React from 'react'
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views';
import { Typography } from '@mui/material';
import ScenesInterface from './scenes.js'
import SoundsInterface from './soundboard.js';
import Automation from './automation.js'
import VolumeInterface from './volume.js'
import { getAPI, info } from './storage.js'
import Brightness1Icon from '@mui/icons-material/Brightness1';

const config = require('./config.js');
var api = `http://${config["api_host"]}:${config["api_port"]}`;

info.removeItem('apiStatusColor')
var $_GET = {};
if (document.location.toString().indexOf('?') !== -1) {
  var query = document.location
    .toString()
    // get the query string
    .replace(/^.*?\?/, '')
    // and remove any existing hash string (thanks, @vrijdenker)
    .replace(/#.*$/, '')
    .split('&');

  for (var i = 0, l = query.length; i < l; i++) {
    var aux = decodeURIComponent(query[i]).split('=');
    $_GET[aux[0]] = aux[1];
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function ApiStatusLight() {
  getAPI(`${api}/api/healthcheck`).then((re) => {
    console.log(`${re}`)
    info.setItem('apiStatusColor', re === true ? "#32DC32" : "red")
  })
}

export default function AdmiralAppBar() {
  ApiStatusLight()
  let statusColor = info.getItem('apiStatusColor') !== null ? info.getItem('apiStatusColor') : "red"
  console.log(`${statusColor}`)
  const [value, setValue] = React.useState(info.getItem('index') === undefined ? 0 : parseInt(info.getItem('index')));
  const theme = useTheme();

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    info.setItem('index', newValue)
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    info.setItem('index', index)
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          centered
        >
          <Tab label="Scenes" {...a11yProps(0)} />
          <Tab label="Soundboard" {...a11yProps(1)} />
          <Tab label="Automation" {...a11yProps(2)} />
          <Tab label="Volume" {...a11yProps(3)} />
          <Brightness1Icon sx={{
            color: `${statusColor}`,
            padding: 2,
          }} />
        </Tabs>

      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ScenesInterface />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SoundsInterface />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Automation />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <VolumeInterface />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}