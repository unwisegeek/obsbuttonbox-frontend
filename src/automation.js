import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { info, getAPI } from './storage.js'

const config = require('./config.js');

var referrer = window.location.href;
var api = `http://${config["api_host"]}:${config["api_port"]}`;

var rows = []
var entry = []

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    textColor: '#FFFFFF',
    backgroundColor: '#0720F0',
  }));

function createButtonData(label, link) {
    return { label, link };
  }

getAPI(`${api}/api/automation/triggers`)
    .then((data) => {              
        info.setItem('triggers_available', data)
    });

let trigger_data = info.getItem('triggers_available');
let triggers_available = trigger_data != null ? trigger_data.split(',') : ""
for (var i = 0; i < triggers_available.length; i++) {
    entry = triggers_available[i].split(":")
    rows.push(createButtonData(entry[0], `/api/automation?trigger=${entry[1]}`))
}

export default function Automation() {
        return (
        <Box sx={{ flexGrow: 1 }}>
        {/* Countdown Automation */}
            <Grid container spacing={2}>
            {rows.map((row) => (
                <Grid item 
                xs={3}
                sm={3}
                md={3}
                lg={3}
                xl={3}
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