import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


import { useNavigate } from 'react-router-dom';


export const Landing = () => {
    return <div>
        <Grid container style={{ padding: "4vw", marginTop: 60 }}>
            <Grid item xs={12} md={6} lg={6}>
                <div style={{ marginTop: 100 }}>
                    <Typography variant={"h2"}>
                        CourseHub 
                    </Typography>
                    <Typography variant={"h5"}>
                        A place to learn, earn and grow
                    </Typography>

                </div>
                <div>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
                <img src={"https://st2.depositphotos.com/1350793/8441/i/450/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg"} width={"100%"} />
            </Grid>
        </Grid>
    </div>
}

