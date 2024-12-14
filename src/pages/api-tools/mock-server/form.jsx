import { useState, useEffect } from 'react';

// project import
import MainCard from 'components/MainCard';
import {fetcherPost} from 'utils/axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AnimateButton from 'components/@extended/AnimateButton';
import ControlledAccordions from 'components/@extended/ControlledAccordions';
import Input from 'components/@extended/InputElement';
import RequestForm from 'components/Forms/RequestForm';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import { EditIcon } from 'components/Icons';


import * as Yup from 'yup';
import { Formik } from 'formik';
import { useOutletContext, useLocation } from 'react-router-dom';
import { errorParser } from "utils/errors";
import { objectToSelectOptions } from "utils/common";
// ==============================|| SAMPLE PAGE ||============================== //

export default function Form({update}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar, toast } = useOutletContext();

  const [tabvalue, settabvalue] = useState('1');
  const [requestChange, setrequestChange] = useState(0);
  const [mockserverId, setmockserverId] = useState(update?location.state.id:false);
  const handleTabChange = (event, newValue) => {
    if(mockserverId)
    settabvalue(newValue);
  };
  const handleRequestChange = () => {
    setrequestChange(requestChange+1);
  };

  const pageProps = {
    readSlug:'mockserver-read',
    updateSlug:'mockserver-update',
    formLink:"/mockserver-create",
    updateFormLink:"/mockserver-update",
    title:"Mock Server",
  }
  const [projects, setprojects] = useState([]);
  const [formvalues, setformvalues] = useState({
    project_id: '',
    name: '',
    description: '',
  });

  const formSchema = Yup.object().shape({
    project_id: Yup.string().max(255).required('Project is required'),
    name: Yup.string().max(255).required('Name is required'),
    description: Yup.string().max(255).required('Description is required'),
  });
  const formFields = [
    { name: 'project_id', label: 'Project', type: 'select', options: projects },
    { name: 'name', label: 'Server Name', type: 'text' },
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
                settabvalue('2');
                setmockserverId(data?.data?.id);
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

  function getRequiredData(){
    fetcherPost("project-read",{})
    .then(data => {
      if(data.status=="success")
        setprojects(objectToSelectOptions(data.data.data,'id','project_name'));
    })
    .catch(e => {
      showSnackbar(e.error,"error");
    });
  }
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
    getRequiredData();
  },[]);

  return (
    <>
    <TabContext value={tabvalue}>
    <TabList onChange={handleTabChange} sx={{ backgroundColor: '#fff' }} aria-label="lab API tabs example">
            <Tab label="Mock Server Details" value="1" />
            <Tab label="Request & Response" value="2" />
          </TabList>
          <TabPanel sx={{ p: 0 }} value="1">
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
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Next
                  </Button>
                </AnimateButton>
              </Grid>
              </Grid>
              </form>
              )}
      </Formik>
    </MainCard>
    </TabPanel>
    <TabPanel sx={{ p: 0 }} value="2">
    <MainCard title="Request Data" secondary={<RequestForm btnContent={'Add Request'} mockserverId={mockserverId} handleRequestChange={handleRequestChange}/>}>
      <ControlledAccordions 
      mockserverId={mockserverId} 
      requestChange={requestChange}
      requestForm={<RequestForm btnContent={<EditIcon />} mockserverId={mockserverId} handleRequestChange={handleRequestChange}/>}
      /> 
    </MainCard>
    </TabPanel>
    </TabContext>
    </>
  );
}
