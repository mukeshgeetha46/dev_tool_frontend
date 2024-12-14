// components/Snackbar.js
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const SnackBar = ({ open, message, severity, handleClose, autoHideDuration = 6000 }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust position if needed
    >
      <Alert onClose={handleClose} variant="filled" severity={severity} sx={{ width: '100%' }}>
        {(severity=='error')&&(
        <AlertTitle>Error</AlertTitle>
        )}
        <span 
        style={{ fontSize: '15px' }}
        dangerouslySetInnerHTML={{ __html: message }} 
        />
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
