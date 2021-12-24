import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { info, getAPI, Linkbutton, sendAPIReq } from './storage.js'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


const config = require('./config.js');
var api = `http://${config["api_host"]}:${config["api_port"]}`;

var rows = []
var entry = []

function createButtonData(label, link) {
    return { label, link };
}

let trigger_data = info.getItem('triggers_available');
let triggers_available = trigger_data != null ? trigger_data.split(',') : ""
for (var i = 0; i < triggers_available.length; i++) {
    entry = triggers_available[i].split(":")
    rows.push(createButtonData(entry[0], `/api/automation?trigger=${entry[1]}`))
}

getAPI(`${api}/api/getscrollbar`)
    .then((data) => {
        info.setItem('scrollbar-line1', data["line1"])
        info.setItem('scrollbar-line2', data["line2"])
    });

function sendScrollbar() {
    let msg1 = info.getItem(`scrollbar-line1`)
    let msg2 = info.getItem(`scrollbar-line2`)
    getAPI(`${api}/api/setscrollbar?line=1&msg=${msg1}`)
    getAPI(`${api}/api/setscrollbar?line=2&msg=${msg2}`)
}

export default function Automation() {
    return (
        <div>
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
            <Box
                component="form"
                sx={{ flexGrow: 1, m: 2 }}
                noValidate
                autoComplete="off"
            >

                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="flex-end"
                >
                    <Grid item
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        xl={10}
                    >
                        <TextField
                            fullwidth
                            margin="dense"
                            sx={{ width: "100%" }}
                            id="scrollbar-line1"
                            label="Scrollbar Line 1"
                            defaultValue={info.getItem('scrollbar-line1')}
                            onChange={(e) => info.setItem('scrollbar-line1', e.target.value)}
                        /></Grid>
                    <Grid item
                        xs={2}
                        sm={2}
                        md={2}
                        lg={2}
                        xl={2}
                    />
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="flex-end"
                >
                    <Grid item
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        xl={10}
                    >
                        <TextField
                            fullwidth
                            margin="dense"
                            sx={{ width: "100%" }}
                            id="scrollbar-line2"
                            label="Scrollbar Line 2"
                            defaultValue={info.getItem('scrollbar-line2')}
                            onChange={(e) => info.setItem('scrollbar-line2', e.target.value)}
                        /></Grid>
                    <Grid item
                        xs={2}
                        sm={2}
                        md={2}
                        lg={2}
                        xl={2}
                    >
                        <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            size="large"
                            onClick={() => {
                                sendScrollbar(2)
                            }}
                            sx={{ margin: "10px", justifycontent: "right" }}
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}