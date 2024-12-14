import { useState, useEffect } from 'react';
import * as React from 'react';

import MainCard from 'components/MainCard';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';

import { Formik } from 'formik';
import Grid from '@mui/material/Grid';
import Input from 'components/@extended/InputElement';
import AnimateButton from 'components/@extended/AnimateButton';
import {fetcherPost} from 'utils/axios';
import * as Yup from 'yup';
import { useOutletContext } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import {CloseIcon} from 'components/Icons';

export default function SwipeableTemporaryDrawer({btnContent,mockserverId, handleRequestChange,editId}) {
  const { showSnackbar, toast } = useOutletContext();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const pageProps = {
    readSlug:'mockserverrequest-read',
    updateSlug:'mockserverrequest-update',
    createSlug:'mockserverrequest-create',
    formLink:"mockserverrequest-create",
    updateFormLink:"/mockserver-update",
    title:"Mock Server",
  }

  const [update, setupdate] = useState(false);
  const [methods, setmethods] = useState([
    {key:'POST','value':'POST'},
    {key:'GET','value':'GET'},
    {key:'PUT','value':'PUT'},
    {key:'DELETE','value':'DELETE'},
    {key:'PATCH','value':'PATCH'},
  ]);
  const [responseTypes, setresponseTypes] = useState([
    {key:'plaintext','value':'Plain Text'},
    {key:'json','value':'JSON'},
  ]);

  const toggleDrawer = (anchor, open) => (event) => {
    console.log("📢[:30]: event: ", event.key);
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    if(open && editId){
      getData();
      setupdate(true);
    } else {
      setupdate(false);
    }
  };

  const [formvalues, setformvalues] = useState({
    name: '',
    description: '',
    method: '',
    url_slug: '',
    response_type: 'json',
    response_code: '',
    delay: '0',
    response: '',
  });

  const formSchema = Yup.object().shape({
    name: Yup.string()
        .max(255, 'Name cannot exceed 255 characters')
        .required('Name is required'),
    description: Yup.string()
        .nullable(),
    method: Yup.string()
        .oneOf(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 'Invalid method')
        .required('Method is required'),
    url_slug: Yup.string()
        .max(255, 'URL slug cannot exceed 255 characters')
        .required('URL slug is required'),
    response_type: Yup.string()
        .required('Response type is required'),
    response_code: Yup.number()
        .integer('Response code must be a valid integer')
        .required('Response code is required'),
    delay: Yup.number()
        .integer('Delay must be a valid integer')
        .min(0, 'Delay cannot be negative')
        .required('Delay is required'),
    response: Yup.string()
        .required('Response is required'),
  });

  const formFields = [
    { name: 'method', label: 'Method', type: 'select', options: methods,width:2 },
    { name: 'name', label: 'Name', type: 'text',width:10 },
    { name: 'description', label: 'Description', type: 'textarea',rowCount:2 },
    { name: 'url_slug', label: 'URL Slug', type: 'text' },
    { name: 'response_type', label: 'Response Type', type: 'select',options: responseTypes,width:4 },
    { name: 'response_code', label: 'Response Code', type: 'text',width:4 },
    { name: 'delay', label: 'Response Delay', type: 'text', endAdornment:'ms',width:4 },
    { name: 'response', label: 'Response', type: 'textarea',rowCount:19 },
  ];

  const handleFormSubmit = async (values,{ resetForm }) => {
    values.mock_server_id = mockserverId;
      let response = fetcherPost(pageProps[update?"updateSlug":"createSlug"],values)
      toast.promise(
        response,
        {
          pending: 'Saving data...',
          success: {
            render({ data }) {
              if(data.status=="success")
              {
                handleRequestChange();
                if(!update)
                resetForm();
                return data?.data?.message;
              }
            },
          },
          error: {
            render({ data }) {
              return errorParser(data);
            },
          }
        }
      );
  };

  function getData(){
    if(!editId)
      return showSnackbar("Error fetch Id","error");
    fetcherPost(pageProps.readSlug,{id:editId})
    .then(data => {
      if(data.status=="success")
        setformvalues(data.data.data[0]);
    })
    .catch(e => {
      showSnackbar(e.error,"error");
    });
  }
  // useEffect(() => {
  //   if(editId)
  //   getData();
  // },[]);

  const list = (anchor) => (
    <Box
      sx={{
        width: { xs: '100%', md: '50vw' }, // 100% width on mobile (xs), 50vw on medium screens and larger
        mt: 6
      }}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
    <MainCard
    sx={{
      maxHeight: 'calc(100vh - 64px)',
      overflowY:'scroll',
    }}
    title="Project Form" secondary={<IconButton onClick={toggleDrawer(anchor, false)} aria-label="delete" size="large">
        <CloseIcon />
      </IconButton>}>
      <Formik
        initialValues={formvalues}
        enableReinitialize={true}  
        validationSchema={formSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {formFields.map((field) => (
             <Input 
             field={field} 
             touched={touched[field.name]} 
             values={values[field.name]} 
             handleBlur={handleBlur} 
             handleChange={handleChange} 
             errors={errors[field.name]}/>
            ))}
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <AnimateButton>
                  <Button disableElevation onClick={toggleDrawer(anchor, false)} fullWidth size="large" type="button" variant="contained" color="error">
                    Cancel
                  </Button>
                </AnimateButton>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {update?'Update':'Create'}
                  </Button>
                </AnimateButton>
              </Grid>
              </Grid>
              </form>
              )}
      </Formik>
      </MainCard>
    </Box>
  );

  return (
    <div>
        <React.Fragment key={'right'}>
          <Button onClick={toggleDrawer('right', true)}>{btnContent}</Button>
          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}
