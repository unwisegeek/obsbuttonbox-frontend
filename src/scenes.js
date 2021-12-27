import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Linkbutton, sendAPIReq } from './storage.js'

const config = require('./config.js');
var api = `http://${config["api_host"]}:${config["api_port"]}`;

function createButtonData(label, link) {
    return { label, link };
}

const rows = [
    createButtonData('Starting Soon', '/api/?call=SetCurrentScene&scene-name=Starting Soon'),
    createButtonData('Left Monitor w/ Lower-Left Camera', '/api/?call=SetCurrentScene&scene-name=Left Monitor w%2F Lower-Left Camera'),
    createButtonData('Left Monitor w/ Lower-Right Camera', '/api/?call=SetCurrentScene&scene-name=Left Monitor w%2F Lower-Right Camera'),
    createButtonData('Outro', '/api/?call=SetCurrentScene&scene-name=Outro'),
]

export default function ScenesInterface() {
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
                        <Linkbutton
                            sx={{ width: "100%" }}
                            variant="contained"
                            onClick={() => {
                                sendAPIReq(api + row.link)
                            }}
                        >
                            {row.label}
                        </Linkbutton>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
