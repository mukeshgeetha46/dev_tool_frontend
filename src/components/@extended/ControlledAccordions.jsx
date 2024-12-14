import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {fetcherPost} from 'utils/axios';
import { useOutletContext } from 'react-router-dom';
import { DownIcon } from 'components/Icons';
import ApiDetailsCard from 'components/@extended/ApiDetailsCard';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

  // Method color mapping
  const methodColors = {
    GET: 'success',
    POST: 'primary',
    PUT: 'warning',
    DELETE: 'error',
    PATCH: 'secondary',
  };

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={<DownIcon sx={{ fontSize: '0.9rem' }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor: 'rgba(0, 0, 0, .03)',
//   flexDirection: 'row-reverse',
//   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//     transform: 'rotate(90deg)',
//   },
//   '& .MuiAccordionSummary-content': {
//     marginLeft: theme.spacing(1),
//   },
//   ...theme.applyStyles('dark', {
//     backgroundColor: 'rgba(255, 255, 255, .05)',
//   }),
// }));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions({mockserverId,requestChange,requestForm}) {
  const { showSnackbar, toast } = useOutletContext();
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [mockserverReq, setmockserverReq] = React.useState([]);
  const pageProps = {
    readSlug:'mockserverrequest-read',
  }
  function getData(){
    if(!mockserverId)
      return showSnackbar("Error fetch Id","error");
    fetcherPost(pageProps.readSlug,{mock_server_id:mockserverId})
    .then(data => {
      if(data.status=="success")
        setmockserverReq(data.data.data);
    })
    .catch(e => {
      showSnackbar(e.error,"error");
    });
  }
  React.useEffect(() => {
    getData();
  },[requestChange]);

  return (
    <div>
     {mockserverReq.length > 0 && mockserverReq.map((row, index) => (
        <Accordion expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)} key={index}>
          <AccordionSummary aria-controls={`panel${index + 1}d-content`} id={`panel${index + 1}d-header`} >
            <Stack direction="row" spacing={1} alignItems="center"> {/* Align items vertically */}
              <Chip size="medium" label={row.method} color={methodColors[row.method] || 'default'} />
              <Typography>{row.url_slug}</Typography> {/* Dynamically render the URL slug */}
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
          <ApiDetailsCard apiDetails={row} requestForm={requestForm} methodColors={methodColors}/>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
