import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import {info, getAPI} from './storage.js'

const config = require('./config.js');
var referrer = window.location.href;
var api = `http://${config["api_host"]}:${config["api_port"]}`;

var rows = []

function createButtonData(label, link) {
    return { label, link };
  }

let sounds_data = info.getItem('sounds_available')

if (sounds_data === null) {
    getAPI(`${api}/api/sounds-available`).then((data) => {      
        info.setItem('sounds_available', data);
    });
    let sounds_data = info.getItem('sounds_available')
}

let sounds_available = sounds_data != null ? sounds_data.split(',') : ""
for (var i = 0; i < sounds_available.length; i++) {
    rows.push(createButtonData(sounds_available[i], `/api/sound?name=${sounds_available[i]}`))
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    textColor: '#FFFFFF',
    backgroundColor: '#0720F0',
  }));
  
export default function SoundsInterface() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {rows.map((row) => (
                    <Grid item 
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={6}
                    >
                        <Item>
                            <Link
                            variant='body2'
                            underline='none'
                            color='#CCCCCC'
                            href={api+row.link+"&ref="+referrer}
                            >
                                {row.label}
                            </Link>
                        </Item>
            </Grid>
            ))}
            </Grid>
        </Box>
    );
}