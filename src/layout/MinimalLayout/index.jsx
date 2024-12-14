import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';  // Import the custom hook
import Snackbar from 'components/popup/Snackbar';  // Import the custom hook

export default function MinimalLayout() {
  const { 
    snackbarOpen, 
    snackbarMessage, 
    snackbarSeverity, 
    showSnackbar, 
    handleSnackbarClose 
  } = useSnackbar();

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
      

      {/* Outlet to render the child routes */}
      <Outlet context={{ showSnackbar }} />
    </>
  );
}
