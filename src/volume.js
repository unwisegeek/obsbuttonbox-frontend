import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Link from '@mui/material/Link'
import { info, getAPI } from './storage.js'

const config = require('./config.js');
var referrer = window.location.href;
var api = `http://${config["api_host"]}:${config["api_port"]}`;
var rows = []

// function createSliderData(item) {

//     return { name, status, volume, muted }
// }

getAPI(`${api}/api/getsoundsources`)
    .then((data) => {
        for (var i = 0; i < Object.keys(data["sources"]).length; i++) {
            let source_name = data["sources"][i].name
            let status = data["sources"][i].status
            let volume = data["sources"][i].volume
            let muted = data["sources"][i].muted
            rows.push({ source_name, status, volume, muted })
        }
    })

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
    {
        value: 0,
        label: '0.0 dB'
    },
];

function valuetext(value) {
    return `${value} dB`;
}

export default function VolumeInterface() {
    let grid_size = 12 / rows.length
    return (
        <Box sx={{ height: "70vh" }}>
            <Grid container
                spacing={2}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {rows.map((row) => (
                    <Grid item
                        xs={grid_size}
                        sm={grid_size}
                        md={grid_size}
                        lg={grid_size}
                        xl={grid_size}
                    >
                        {row.source_name}
                    </Grid>
                ))}
                {rows.map((row) => (
                    <Grid item
                        xs={grid_size}
                        sm={grid_size}
                        md={grid_size}
                        lg={grid_size}
                        xl={grid_size}
                    >
                        <Slider
                            sx={{ height: "50vh" }}
                            aria-label="Custom marks"
                            defaultValue={row.volume}
                            orientation="vertical"
                            getAriaValueText={valuetext}
                            min={-40}
                            max={0}
                            step={.1}
                            valueLabelDisplay="on"
                            marks={marks}
                            onChangeCommitted={(event, value) => changeVolume(event, value, row.source_name)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}