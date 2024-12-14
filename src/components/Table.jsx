import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { Menu, MenuItem, IconButton } from '@mui/material';
import {MoreActionIcon} from "components/Icons";
// third-party
import { NumericFormat } from 'react-number-format';
import { useNavigate,useOutletContext } from 'react-router-dom';
import { fetcherPost } from 'utils/axios';

// project import
import Dot from 'components/@extended/Dot';

// ==============================|| DYNAMIC TABLE - HEADER ||============================== //

function ActionsMenu({row,pageProps,fetchFunction}) {
  const { showSnackbar } = useOutletContext();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleUpdateNav = (row) => {
    setAnchorEl(null);
    navigate(pageProps.updateFormLink,{state:{id:row.id}});
  };
  const handleActiveToggle = (row) => {
    setAnchorEl(null);
    fetcherPost(pageProps.updateSlug,{id:row.id,is_active:row.is_active==1?'0':'1'})
    .then(data => {
      if(data.status=="success")
        fetchFunction();
    })
    .catch(e => {
      showSnackbar(e.error,"error");
    });
  };
  return (
    <div>
      <IconButton onClick={handleMenuClick}>
        <MoreActionIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={()=>handleUpdateNav(row)}>Edit</MenuItem>
        <MenuItem onClick={()=>handleActiveToggle(row)}>Set as {row.is_active?"In-":""}Active</MenuItem>
      </Menu>
    </div>
  );
}


function DynamicTableHead({ headers, order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell
            key={header.id}
            align={header.align || 'left'}
            padding={header.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === header.id ? order : false}
          >
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| DYNAMIC STATUS RENDERER ||============================== //

function DynamicStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'In-Active';
      break;
    case 1:
      color = 'success';
      title = 'Active';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| DYNAMIC TABLE COMPONENT ||============================== //

export default function DynamicTable({ headers, data, order = 'asc', orderBy = 'id', pageProps, fetchFunction }) {
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <DynamicTableHead headers={headers} order={order} orderBy={orderBy} />
          <TableBody>
          {data.length > 0 ? (stableSort(data, getComparator(order, orderBy)).map((row, index) => {

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row[orderBy] || index}
                >
                  {headers.map((header) => (
                    <TableCell
                     
                    >
                      {header.id === 'is_active' ? (
                        <DynamicStatus status={row[header.id]} />
                      ) : header.id === 'totalAmount' ? (
                        <NumericFormat value={row[header.id]} displayType="text" thousandSeparator prefix="$" />
                      ) : header.id === 'tracking_no' ? (
                        <Link color="secondary">{row[header.id]}</Link>
                      ) : header.date ? (
                        dayjs(row[header.id]).format('D MMM YYYY')
                      ) : header.id =="action" ? (
                        <ActionsMenu row={row} pageProps={pageProps} fetchFunction={fetchFunction}/>
                      ) : (
                        row[header.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// Helper Functions and PropTypes

DynamicTableHead.propTypes = { headers: PropTypes.array.isRequired, order: PropTypes.any, orderBy: PropTypes.string };
DynamicStatus.propTypes = { status: PropTypes.number };

DynamicTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      disablePadding: PropTypes.bool
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// Sorting and Comparator Functions

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
