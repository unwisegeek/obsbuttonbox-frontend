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

var $_GET = {};
if(document.location.toString().indexOf('?') !== -1) {
    var query = document.location
                   .toString()
                   // get the query string
                   .replace(/^.*?\?/, '')
                   // and remove any existing hash string (thanks, @vrijdenker)
                   .replace(/#.*$/, '')
                   .split('&');

    for(var i=0, l=query.length; i<l; i++) {
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
  
  export default function AdmiralAppBar() {
    const [value, setValue] = React.useState($_GET['idx'] === undefined ? 0 : parseInt($_GET['idx']));
    const theme = useTheme();

    function a11yProps(index) {
        return {
          id: `full-width-tab-${index}`,
          'aria-controls': `full-width-tabpanel-${index}`,
        };
      }
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
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
            <Tab label="Future Item" {...a11yProps(2)} disabled />
            <Tab label="Future Item" {...a11yProps(3)} disabled />
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
            Future Item
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            Future Item
          </TabPanel>
        </SwipeableViews>
      </Box>
    );
  }