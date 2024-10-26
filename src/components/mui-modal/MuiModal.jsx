import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '12px',
    padding: '20px 30px',
};

export default function MuiModal({ children }) {

    return (
        <div>
            <Modal
                open
            >
                <Box sx={style}>
                    { children }
                </Box>
            </Modal>
        </div>
    );
}
