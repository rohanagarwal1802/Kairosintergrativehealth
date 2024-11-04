// components/PatientForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  IconButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';

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
  preferredProvider: Yup.string().required('Preferred Provider is required'),
  howDidYouHear: Yup.string().required('This field is required'),
  preferredTime: Yup.string().required('Preferred Time Slot is required'),
  questions: Yup.array().of(Yup.string().required('This question is required')),
  service: Yup.string().required('Service is required'),
  captchaVerification: Yup.string().required('Please verify the captcha')
});

const PatientForm = () => {
  const [captchaValue, setCaptchaValue] = React.useState('');

  // Function to generate captcha
  const generateCaptcha = () => {
    return Math.random().toString(36).substring(2, 8); 
  };

  // Set initial captcha value on mount
  React.useEffect(() => {
    setCaptchaValue(generateCaptcha());
  }, []);
//
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      dob: '',
      email: '',
      mobile: '',
      preferredProvider: '',
      howDidYouHear: '',
      preferredTime: '',
      questions: Array(6).fill(''),
      service: '',
      captchaVerification: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Form Data', values);
     try{
        const questions=values.questions;
        const dobDate = new Date(values.dob);
        const formattedDob = dobDate.toISOString();
        const data ={
            ...values,
            dob: new Date(values.dob).toISOString(),

            timeSlot:values.preferredTime,
            willing_recommened_treatment_plan:
questions[0]==="yes"?true:false,
thinking_about_harming_themselves:
questions[1]==="yes"?true:false,
experiencing_beliefs:
questions[2]==="yes"?true:false,
document_required:
questions[3]==="yes"?true:false,
hasRecievedDiagnosisOrHaveSymptoms:
questions[4]==="yes"?true:false,
struggling_with_substance_use:
questions[5]==="yes"?true:false,

        }
const resp=await axios.post('/api/addNewPatient',data)
alert("Patient added succesfully")
console.log("response of adding patient ===> ",resp)
     }
     catch(error){
      if(error.status===400)
      {
        alert("Duplicate Email or Mobile.")
        return
      }
       console.log("error in registering partner ===>",error) 
     }

      // Handle form submission (e.g., API call)
    },
    onReset: () => {
      setCaptchaValue(generateCaptcha()); // Refresh captcha on reset
    }
  });

  const refreshCaptcha = () => {
    setCaptchaValue(generateCaptcha());
    formik.setFieldValue('captchaVerification', ''); // Clear captcha input on refresh
  };

  const RequiredLabel = ({ label }) => (
    <Typography component="span">
      {label}
      <Typography component="span" color="error" sx={{ ml: 0.5 }}>
        *
      </Typography>
    </Typography>
  );

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '98%', },
        mx: 'auto',
        my: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: '#f5f5f5'
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: 'navy' }}>
        Patient Portal
      </Typography>
      <hr style={{ width: '80%', margin: 'auto', borderColor: 'black' }} />

      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        {/* Preferred Provider and How did you hear from us */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2, gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel><RequiredLabel label="Preferred Provider" /></InputLabel>
            <Select
              name="preferredProvider"
              value={formik.values.preferredProvider}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
              <MenuItem value="Dr. Johnson">Dr. Johnson</MenuItem>
              <MenuItem value="Dr. Williams">Dr. Williams</MenuItem>
            </Select>
            {formik.touched.preferredProvider && formik.errors.preferredProvider && (
              <Typography color="error">{formik.errors.preferredProvider}</Typography>
            )}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel><RequiredLabel label="How did you hear from us" /></InputLabel>
            <Select
              name="howDidYouHear"
              value={formik.values.howDidYouHear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Friend">Friend</MenuItem>
              <MenuItem value="Advertisement">Advertisement</MenuItem>
            </Select>
            {formik.touched.howDidYouHear && formik.errors.howDidYouHear && (
              <Typography color="error">{formik.errors.howDidYouHear}</Typography>
            )}
          </FormControl>
        </Box>

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
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
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

          <FormControl fullWidth>
            <InputLabel><RequiredLabel label="Preferred Time Slot" /></InputLabel>
            <Select
              name="preferredTime"
              value={formik.values.preferredTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="Morning">Morning</MenuItem>
              <MenuItem value="Afternoon">Afternoon</MenuItem>
              <MenuItem value="Evening">Evening</MenuItem>
            </Select>
            {formik.touched.preferredTime && formik.errors.preferredTime && (
              <Typography color="error">{formik.errors.preferredTime}</Typography>
            )}
          </FormControl>
        </Box>

        {/* Radio Questions */}
        {[
          "Do you have any allergies?",
          "Have you had recent surgery?",
          "Are you taking any medications?",
          "Do you smoke?",
          "Do you exercise regularly?",
          "Have you traveled internationally recently?"
        ].map((question, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <Typography><RequiredLabel label={question} /></Typography>
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



        {/* Additional Question */}
        <Box sx={{ mt: 2 }}>
          <Typography>What service are you looking for?</Typography>
          <Typography><RequiredLabel label={"service"} /></Typography>
          <RadioGroup
            row
            name="service"
            value={formik.values.service}
            onChange={formik.handleChange}
          >
            <FormControlLabel value="Therapy Only" control={<Radio />} label="Therapy Only" />
            <FormControlLabel value="Medication Management & Therapy" control={<Radio />} label="Medication Management & Therapy" />
          </RadioGroup>
          {formik.touched.service && formik.errors.service && (
            <Typography color="error">{formik.errors.service}</Typography>
          )}
        </Box>

        {/* Captcha */}
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <TextField
           label={<RequiredLabel label="Captcha" />}
            name="captchaVerification"
            value={formik.values.captchaVerification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            helperText={`Please enter: ${captchaValue}`}
          />
          
          <IconButton onClick={refreshCaptcha}>
            <RefreshIcon />
          </IconButton>
        </Box>
        {formik.touched.captchaVerification && formik.errors.captchaVerification && (
          <Typography color="error">{formik.errors.captchaVerification}</Typography>
        )}

        {/* Submit and Reset Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button variant="outlined" color="secondary" type="reset">
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PatientForm;
