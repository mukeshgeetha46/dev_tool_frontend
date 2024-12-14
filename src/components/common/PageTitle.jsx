import { Grid, Typography, Button } from '@mui/material';
import { Link } from "react-router-dom";
import { AddIcon } from "components/Icons.jsx"

const PageTitleComponent = ({title,link}) => {
  return (
    <Grid p={2} container  spacing={2} alignItems="center" justifyContent="space-between">
      <Grid item xs={10}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      {(link&&(
        <Grid item xs={2} container justifyContent="flex-end">
        <Button variant="contained" component={Link} to={link} endIcon={<AddIcon />} >
          Add
        </Button>
        </Grid>
      ))
      }
      
    </Grid>
  );
};

export default PageTitleComponent;
