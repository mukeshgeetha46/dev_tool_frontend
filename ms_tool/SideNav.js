import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
  createTheme,
  useMediaQuery
} from '@mui/material';
import { Logo } from './logo';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { useLocation } from 'react-router-dom';


export const SideNav = (props) => {
  const location = useLocation();
  useEffect(() => {
    setCurrentSlug(location.pathname);
  }, [location.pathname])
  const { open, onClose, setOpenNav } = props;
  const theme = createTheme();
  const [currentSlug,setCurrentSlug] = useState('/dashboard');
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  function handleCloseSidebar(path) {
    setOpenNav(false);
    setCurrentSlug(path);
  }
  const content = (
  
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="h6"
              >
                MS
              </Typography>
              <Typography
                color="neutral.400"
                variant="body2"
              >
                {process.env.REACT_APP_ENVIRONMENT || ''}
              </Typography>
            </div>
            {/* <SvgIcon
              fontSize="small"
              sx={{ color: 'neutral.500' }}
            >
              <ChevronUpDownIcon />
            </SvgIcon> */}
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            
            {items.map((item) => {
              return (
                <Link onClick={()=>handleCloseSidebar(item.path)} to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <SideNavItem
                  active={(currentSlug == item.path)}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  title={item.title}
                />
          </Link>

              );
            })}
          </Stack>
        </Box>       
      </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#1c2536',
            color: 'common.white',
            width: 280,
            height:'100%'
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#1c2536',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: () => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};