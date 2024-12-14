import { useState, useEffect } from 'react';

// project import
import MainCard from 'components/MainCard';
import {fetcherPost} from 'utils/axios';
import Grid from '@mui/material/Grid';

import AnimateButton from 'components/@extended/AnimateButton';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

import Input from 'components/@extended/InputElement';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useOutletContext, useLocation } from 'react-router-dom';
import { errorParser } from "utils/errors";
// ==============================|| SAMPLE PAGE ||============================== //

export default function Form({update}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar, toast } = useOutletContext();

  const pageProps = {
    readSlug:'project-read',
    updateSlug:'project-update',
    formLink:"/project-create",
    title:"Project",
  }
  const [formvalues, setformvalues] = useState({
    project_name: '',
    stack: '',
    description: '',
  });

  const formSchema = Yup.object().shape({
    project_name: Yup.string().max(255).required('Project Name is required'),
    stack: Yup.string().max(255).required('Stack is required'),
    description: Yup.string().max(255).required('Description is required'),
  });
  const formFields = [
    { name: 'project_name', label: 'Project Name', type: 'text' },
    { name: 'stack', label: 'Stack', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
  ];

  const handleFormSubmit = async (values) => {
      let response = fetcherPost(pageProps[update?"updateSlug":"formLink"],values)
      toast.promise(
        response,
        {
          pending: 'Saving data...',
          success: {
            render({ data }) {
              if(data.status=="success")
              {
                navigate('/project-list');
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
      if(response.status=="success"){
        navigate('/project-list');
      }
  };

  function getData(){
      
    if(!location.state)
      return showSnackbar("Error fetch Id from state","error");
    fetcherPost(pageProps.readSlug,{id:location.state.id})
    .then(data => {
      if(data.status=="success")
        setformvalues(data.data.data[0]);
    })
    .catch(e => {
      showSnackbar(e.error,"error");
    });
  }
  useEffect(() => {
    if(update)
    getData();
  },[]);

  return (
    <>
    <MainCard title="Project Form">
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
            <Grid item xs={6} md={2}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </AnimateButton>
              </Grid>
              </Grid>
              </form>
              )}
      </Formik>
    </MainCard>
    </>
  );
}
