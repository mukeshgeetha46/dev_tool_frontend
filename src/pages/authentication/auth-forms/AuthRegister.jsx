import { useEffect, useState } from 'react';
import { Link as RouterLink , useNavigate} from 'react-router-dom';

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
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

import axios from 'axios';

// const api_url = import.meta.env.VITE_APP_API_URL;

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {

  const navigate = useNavigate();

  const [level, setLevel] = useState();
  const [pageerror, setpageerror] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (values) => {
    try{
      let response = await axios.post(import.meta.env.VITE_APP_API_URL+'register',values)
      if(response.data.status=="success"){
        navigate('/otpverify', { state: { email: values.email } });
      }
    }catch (e){
      console.log("📢[:77]: e.response.data.data.errors.otp: ", e.response);

      if(e.response.data.data.error){
        setpageerror(e.response.data.data.error);
      }
    }
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          company: '',
          designation: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().max(255).required('First Name is required'),
          last_name: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={handleFormSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="first_name-signup">First Name*</InputLabel>
                  <OutlinedInput
                    id="first_name-login"
                    type="first_name"
                    value={values.first_name}
                    name="first_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.first_name && errors.first_name)}
                  />
                </Stack>
                {touched.first_name && errors.first_name && (
                  <FormHelperText error id="helper-text-first_name-signup">
                    {errors.first_name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="last_name-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.last_name && errors.last_name)}
                    id="last_name-signup"
                    type="last_name"
                    value={values.last_name}
                    name="last_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                </Stack>
                {touched.last_name && errors.last_name && (
                  <FormHelperText error id="helper-text-last_name-signup">
                    {errors.last_name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="company-signup">Company</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.company && errors.company)}
                    id="company-signup"
                    value={values.company}
                    name="company"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                    inputProps={{}}
                  />
                </Stack>
                {touched.company && errors.company && (
                  <FormHelperText error id="helper-text-company-signup">
                    {errors.company}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="designation-signup">Designation</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.designation && errors.designation)}
                    id="designation-signup"
                    value={values.designation}
                    name="designation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Software Engineer."
                    inputProps={{}}
                  />
                </Stack>
                {touched.company && errors.company && (
                  <FormHelperText error id="helper-text-company-signup">
                    {errors.company}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
              {pageerror && (
                <Typography sx={{ mb: 2 }} color="error" variant="body1">
                  {pageerror}
                </Typography>
              )}
                <Typography variant="body1">
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
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create Account
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
