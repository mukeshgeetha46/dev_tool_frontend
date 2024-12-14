import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from 'menu-items';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import { useSelector } from 'react-redux';

import useSnackbar from 'hooks/useSnackbar';  // Import the custom hook
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SnackBar from 'components/popup/Snackbar';

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  const user = useSelector((state) => state.auth.user);
  if(!user)
  navigate("/login");
  useEffect(() => {
    handlerDrawerOpen(!downXL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL]);

  const { 
    snackbarOpen, 
    snackbarMessage, 
    snackbarSeverity, 
    showSnackbar, 
    handleSnackbarClose 
  } = useSnackbar();
    

  if (menuMasterLoading) return <Loader />;

  return (
    
    <Box sx={{ display: 'flex', width: '100%' }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
        />
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
      <Header />
      <Drawer />
      
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        <Outlet context={{ showSnackbar, toast }} />
      </Box>
    </Box>
  );
}
