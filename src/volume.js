import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Link from '@mui/material/Link'
import {info, getAPI} from './storage.js'

const config = require('./config.js');
var referrer = window.location.href;
var api = `http://${config["api_host"]}:${config["api_port"]}`;

function changeVolume(event, value, slider) {
    getAPI(`${api}/api/?call=SetVolume&volume=${value}:float&source=${slider}&useDecibel=True:bool`)
    .then((data) => {              
        console.log(`${data}`)
       });
}

const marks = [
    {
      value: -40,
      label: '-40.0 dB',
    },
    {
      value: -30,
      label: '-30.0 dB',
    },
    {
      value: -20,
      label: '-20.0 dB',
    },
    {
      value: -10,
      label: '-10.0 dB',
    },
  ];
  
function valuetext(value) {
    return `${value} dB`;
}

export default function VolumeInterface() {
    return (
        <Box sx={{height: "70vh" }}>
            <Grid container 
                spacing={2} 
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                >
                <Grid item 
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                    />
                <Grid item 
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                    >
                        Background Audio
                    </Grid>
                <Grid item
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                    >
                        Microphone
                    </Grid>
                <Grid item 
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3} 
                    />

                <Grid item
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                    />
                <Grid item 
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                    >
                        <Slider
                            sx={{height: "50vh" }}
                            aria-label="Custom marks"
                            defaultValue={-20}
                            orientation="vertical"
                            getAriaValueText={valuetext}
                            min={-40}
                            max={-10}
                            step={.1}
                            valueLabelDisplay="on"
                            marks={marks}
                            onChangeCommitted={(event, value) => changeVolume(event, value, "Desktop Audio")}
                        />
                </Grid>
                <Grid item 
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                    >
                        <Slider
                            sx={{height: "50vh" }}
                            aria-label="Custom marks"
                            defaultValue={-20}
                            orientation="vertical"
                            getAriaValueText={valuetext}
                            min={-40}
                            max={-10}
                            step={.1}
                            valueLabelDisplay="on"
                            marks={marks}
                            onChangeCommitted={(event, value) => changeVolume(event, value, "Mic/Aux")}
                        />
                </Grid>
                <Grid item
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                    />
            </Grid>
        </Box>
    );
}