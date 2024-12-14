import { useEffect, useState } from 'react';
import { useNavigate,useOutletContext } from 'react-router-dom';
// project import
import React from 'react';
import MainCard from 'components/MainCard';
import Table from 'components/Table';
import {fetcherPost} from 'utils/axios';
import Grid from '@mui/material/Grid';
import PageTitle from 'components/common/PageTitle';

// ==============================|| SAMPLE PAGE ||============================== //

export default function List() {

  const navigate = useNavigate();
  const { showSnackbar } = useOutletContext();

  const pageProps = {
    readSlug:'project-read',
    updateSlug:'project-update',
    formLink:"/project-create",
    updateFormLink:"/project-update",
    title:"Project",
  }
  function getData(){
    fetcherPost(pageProps.readSlug,{})
    .then(data => {
      if(data.status=="success")
        setrows(data.data.data);
    })
    .catch(e => {
      showSnackbar(e.error,"error");
    });
  }
  const [rows,setrows] = useState([]);
  const rowsheader = [
    { id: 'id', label: 'ID' },
    { id: 'project_name', label: 'Name' },
    { id: 'stack', label: 'Stack' },
    { id: 'description', label: 'Description' },
    { id: 'is_active', label: 'Status' },
    { id: 'created_at', label: 'Created at', align: 'left',date:true },
    { id: 'action', label: 'Action', data: 'left' },
  ];
  useEffect(() => {
    getData();
  },[]);

  return (
    <>
      <Grid item xs={12} md={7} lg={8}>
        <MainCard sx={{ mt: 2 }} content={false}>
        <PageTitle title={pageProps.title} link={pageProps.formLink}/>
          <Table headers={rowsheader} data={rows} pageProps={pageProps} fetchFunction={getData}/>
        </MainCard>
      </Grid>
  </>
  );
}
