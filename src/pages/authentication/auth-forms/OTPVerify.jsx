import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import axios from 'axios';
// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const navigate = useNavigate();

  const location = useLocation();
  const { email } = location.state || false;
  const [level, setLevel] = useState();
  const [starticon, setstarticon] = useState(false);
  const [invalidotp, setinvalidotp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if(!email)
  navigate('/login');
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (values) => {
    verifyOTP(values.otp);
  };
  const sendOTP = async () => {
      let response = await axios.post(import.meta.env.VITE_APP_API_URL+'sendotp',{email});
      console.log("sendOTP ",response);
      if(response.data.data.errors){

      }
  };
  const verifyOTP = async (otp) => {
    try{
      let response = await axios.post(import.meta.env.VITE_APP_API_URL+'verifyotp',{email,otp});
      console.log("📢[:67]: response: ", response.data.status);
      if(response.data.status=="success"){
        setstarticon(<CheckCircleOutlined/>);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
      
    } catch (e){
      console.error("errR ",e);
      if(e.response.data.data.errors && e.response.data.data.errors.otp){
        console.log("📢[:77]: e.response.data.data.errors.otp: ", e.response.data.data.errors.otp);
        setinvalidotp(e.response.data.data.errors.otp[0]);
      }
      if(e.response.data.data.error){
        console.log("📢[:77]: e.response.data.data.errors.otp: ", e.response.data.data.error);
        setinvalidotp(e.response.data.data.error);
      }
    }
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
    sendOTP();
  }, []);

  return (
    <>
    <Typography sx={{ mb: 2,color: 'success.main' }} to="/login" variant="body1">
              OTP successfully sent to {email}
    </Typography>
      <Formik
        initialValues={{
          otp: '',
        }}
        validationSchema={Yup.object().shape({
          otp: Yup.string()
          .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')  // Ensure exactly 6 digits
          .required('OTP is required')
        })}
        onSubmit={handleFormSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="otp-signup">OTP *</InputLabel>
                  <OutlinedInput
                    id="otp-login"
                    type="text"
                    value={values.otp}
                    name="otp"
                    inputProps={{ maxLength: 6 }}  
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.otp && errors.otp)}
                  />
                </Stack>
                {touched.otp && (errors.otp || invalidotp) && (
                  <FormHelperText error id="helper-text-otp-signup">
                    {errors.otp || invalidotp}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button startIcon={starticon} disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color={starticon?"success":"primary"}>
                    Verify OTP
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
