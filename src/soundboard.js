import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { info, Linkbutton, sendAPIReq } from './storage.js'

const config = require('./config.js');
var api = `http://${config["api_host"]}:${config["api_port"]}`;

var rows = []

function createButtonData(label, link) {
    return { label, link };
}

let sounds_data = info.getItem('sounds_available')
let sounds_available = sounds_data != null ? sounds_data.split(',') : ""
for (var i = 0; i < sounds_available.length; i++) {
    rows.push(createButtonData(sounds_available[i], `/api/sound?name=${sounds_available[i]}`))
}

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