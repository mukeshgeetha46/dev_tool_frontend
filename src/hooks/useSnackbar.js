// hooks/useSnackbar.js
import { useState } from 'react';

const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const errorsObjectToHTML = (errors,setkey) => {
    let error = '';
    for (const key in errors) {
        error += `${(setkey)?key+' : ':''} <i>${errors[key]}</i><br> `;
    }
    return error;
  }

  const showSnackbar = (message, severity = 'info') => {
    if(severity=="error"){
      if(typeof message=="object"){
        setSnackbarMessage(errorsObjectToHTML(message.errors,true));
      } else {
        setSnackbarMessage(message);
      }
    }else{
    setSnackbarMessage(message);
    }
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    handleSnackbarClose,
  };
};

export default useSnackbar;
