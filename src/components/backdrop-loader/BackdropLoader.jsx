import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import {LinearProgress} from "@mui/material";

export default function BackdropLoader({open}) {

    return (
        <div>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1, display: 'flex', alignItems: 'baseline' })}
                open={open}
            >
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            </Backdrop>
        </div>
    );
}
