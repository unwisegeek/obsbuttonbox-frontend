import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

const config = require('./config.js');


var referrer = window.location.href;
var api = `http://${config["api_host"]}:${config["api_port"]}`;


function createButtonData(label, link) {
    return { label, link };
}

const rows = [
    createButtonData("2m", `/api/countdown?time=120`),
    createButtonData("5m", `/api/countdown?time=300`),
    createButtonData("7m", `/api/countdown?time=420`),
    createButtonData("10m", `/api/countdown?time=600`),
]

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    textColor: '#FFFFFF',
    backgroundColor: '#0720F0',
  }));
  
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