import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import { useRouter } from 'next/router';

// Custom Green Theme
import { createTheme, ThemeProvider } from '@mui/material/styles';
const greenTheme = createTheme({
  palette: {
    primary: { main: '#4caf50' },
    secondary: { main: '#81c784' },
  },
});

// Validation Schema
const validationSchema = Yup.object({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string(),
  dob: Yup.date().required('Date of Birth is required').nullable(),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  mobile: Yup.string()
    .required('Mobile is required')
    .matches(/^[0-9]+$/, 'Mobile number must be digits only')
    .min(10, 'Mobile number must be at least 10 digits')
    .max(15, 'Mobile number cannot exceed 15 digits'),
  insurance: Yup.string().required('Insurance is required'),
  questions: Yup.array().of(Yup.string().required('This question is required')),
  // service: Yup.string().required('Service is required'),
  captchaVerification: Yup.string().required('Please verify the captcha'),
});

const PatientForm = () => {
  const [captchaValue, setCaptchaValue] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for the submit button
  const inputRef = useRef(null);
  const router=useRouter()

  useEffect(() => {
    setCaptchaValue(generateCaptcha());
  }, []);

  const generateCaptcha = () => Math.random().toString(36).substring(2, 8);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker(); // Trigger the calendar picker
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      dob: '', // Empty string to maintain a controlled state
      email: '',
      mobile: '',
      insurance:'',
      questions: Array(5).fill(''), // ensure this is an array with values
      // service: '',
      captchaVerification: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form Submitted", values); // Add this to check if onSubmit is triggered
      setLoading(true); // Start loading when submit is triggered
      try {
        const questions = values.questions;
        let val={}

        const {firstname,lastname,mobile,email,dob,insurance}=values
        val.firstname=firstname
        val.lastname=lastname
        val.mobile=mobile
        val.email=email
        val.dob=dob
        val.insurance=insurance

        const patient_detail=await axios.post('/api/getPatientDetailsByEmail',{email:email})
        console.log("Patient Details ",patient_detail)
if(patient_detail.data.status===true)
{
  alert("Patient Already exists with email.")
  return
}
        console.log("val ==>",val)
        
        console.log('Data being sent to server: ', questions); // Log the data
        const response = await axios.post('/api/createPatient', val); // Use 'values' instead of 'data'
    
        if (response.status === 200) {
          try{
            const responseNewPatient = await axios.post('/api/addNewPatient', {
              ...values, 
              TebraValues: response.data // Assuming response.data contains the data you want to send
            });

            console.log("dsjhdj",responseNewPatient)
            if (responseNewPatient.data.data.passed===true) {
              formik.handleReset()
              alert('Patient added successfully. Email will be sent to you shortly');
              router.push("/login")
              
            }
          }
          catch(error)
          {
            console.error('Error in registering patient: ', error);
          }
         
        }
        setLoading(false); // Stop loading after submit
      } catch (error) {
        console.error('Error in registering patient: ', error);
        setLoading(false); // Stop loading on error
        if (error.response && error.response.status === 400) {
          alert('Duplicate Email or Mobile.');
        } else {
          alert('An error occurred while submitting the form.');
        }
      }
      finally{
        setLoading(false)
      }
    },
    
    onReset: () => {
      setCaptchaValue(generateCaptcha());
    },
  });

  const refreshCaptcha = () => {
    setCaptchaValue(generateCaptcha());
    formik.setFieldValue('captchaVerification', '');
  };

  const RequiredLabel = ({ label }) => (
    <Typography component="span">
      {label}
      <Typography component="span" color="error" sx={{ ml: 0.5 }}>*</Typography>
    </Typography>
  );

  return (
    <ThemeProvider theme={greenTheme}>
      <Box
        sx={{
          width: '100%',
          mx: 'auto',
          my: 4,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: '#f5f5f5',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'navy' }}>
          Patient Portal
        </Typography>
        <hr style={{ width: '80%', margin: 'auto', borderColor: 'black' }} />

        <form onSubmit={(e) => { 
          e.preventDefault();  // Prevent the default form submission
          formik.handleSubmit(e); // Manually trigger the form submission
        }} onReset={formik.handleReset}>
          {/* Text Fields */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2, gap: 2 }}>
            <TextField
              label={<RequiredLabel label="Patient's First Name" />}
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <Typography color="error">{formik.errors.firstname}</Typography>
            )}

            <TextField
              label="Patient's Last Name"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <Typography color="error">{formik.errors.lastname}</Typography>
            )}

            <TextField
              label={<RequiredLabel label="Patient's Date of Birth" />}
              name="dob"
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().split('T')[0] }}
              value={formik.values.dob || ''}  // Ensure controlled input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              inputRef={inputRef}
              onClick={handleClick}
              sx={{
                '& .MuiInputLabel-root': { color: 'black' },
                '& .Mui-focused .MuiInputLabel-root': { color: 'black' },
                '& .MuiInputBase-input': { color: 'black' },
              }}
            />
            {formik.touched.dob && formik.errors.dob && (
              <Typography color="error">{formik.errors.dob}</Typography>
            )}

            <TextField
              label={<RequiredLabel label="Patient's Email" />}
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            {formik.touched.email && formik.errors.email && (
              <Typography color="error">{formik.errors.email}</Typography>
            )}

            <TextField
              label={<RequiredLabel label="Patient's Mobile" />}
              name="mobile"
              type="tel"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <Typography color="error">{formik.errors.mobile}</Typography>
            )}
          </Box>

          {/* Radio Questions */}
          {[
            "Do we have permissions to text you?",
            "Are you scheduling an appointment for yourself?",
            "Are you over the age of 18?",
            "Have you been hospitalized or visited the ER for psychiatric reasons within the last 4 weeks?",
            "Are you making this appointment to discuss disability paperwork or seeking care for a work-related injury?",
          ].map((question, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography>
                <RequiredLabel label={question} />
              </Typography>
              <RadioGroup
                row
                name={`questions[${index}]`}
                value={formik.values.questions[index]}
                onChange={formik.handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
              {formik.touched.questions?.[index] && formik.errors.questions?.[index] && (
                <Typography color="error">{formik.errors.questions[index]}</Typography>
              )}
            </Box>
          ))}

          <TextField
            label={<RequiredLabel label="Please list your insurance below" />}
            name="insurance"
            value={formik.values.insurance}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            sx={{ mt: 2 }}
          />
          {formik.touched.insurance && formik.errors.insurance && (
            <Typography color="error">{formik.errors.insurance}</Typography>
          )}

          {/* Additional Question */}
          {/* <Box sx={{ mt: 2 }}>
            <Typography>How can we help?</Typography>
            <RadioGroup
              row
              name="service"
              value={formik.values.service}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="Psychiatry" control={<Radio />} label="Psychiatry" />
              <FormControlLabel value="Psychology" control={<Radio />} label="Psychology" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
            {formik.touched.service && formik.errors.service && (
              <Typography color="error">{formik.errors.service}</Typography>
            )}
          </Box> */}

          {/* Captcha */}
          <Box sx={{ mt: 2 }}>
            <Typography>Captcha: {captchaValue}</Typography>
            <TextField
              label="Enter Captcha"
              name="captchaVerification"
              value={formik.values.captchaVerification}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              sx={{ mt: 1 }}
            />
            {formik.touched.captchaVerification && formik.errors.captchaVerification && (
              <Typography color="error">{formik.errors.captchaVerification}</Typography>
            )}
            <IconButton onClick={refreshCaptcha} sx={{ mt: 1 }}>
              <RefreshIcon />
            </IconButton>
          </Box>

          {/* Submit Button */}
          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Submit'
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default PatientForm;
