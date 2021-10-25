import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

const config = require('./config.js');


var referrer = window.location.href;
var api = `http://${config["api_host"]}:${config["api_port"]}`;

async function getAPI(url) {
    const response = await fetch(url);
    var data = await response.json();
    return data;
}

// var sounds_available = fetch(`${api}/api/sounds-available`)
const data = getAPI(`${api}/api/sounds-available`)
console.log(data)

function createButtonData(label, link) {
  return { label, link };
}

const rows = [
    createButtonData('horn-0', '/api/sound?name=horn-0')
]

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
                    xs='auto'
                    sm='auto'
                    md='auto'
                    lg='auto'
                    xl='auto'
                    >
                        <Item>
                            <Link
                            variant='body2'
                            underline='none'
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
