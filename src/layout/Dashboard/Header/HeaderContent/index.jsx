// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// project import
import { LinkedinOutlined } from '@ant-design/icons';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      <IconButton
        component={Link}
        href="https://www.linkedin.com/in/arumuga-kailash-1783111b5/"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        <LinkedinOutlined />
      </IconButton>

      <Notification />
      {!downLG && <Profile />}
      {downLG && <MobileSection />} 
    </>
  );
}
