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
  List,
  ListItem
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import { useRouter } from 'next/router';
import useCustomSnackbarStore from '@/pages/utils/useCustomSnackbarStore';

// Custom Green Theme
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { add } from 'date-fns';
const greenTheme = createTheme({
  palette: {
    primary: { main: '#6F7863' },
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
  questions: Yup.array().of(Yup.string().required('This question is required') ),
  gender: Yup.string().required('Gender is required'),
  // employment_status: Yup.string().required('Employment Status is required'),
  marital_status: Yup.string().required('Marital Status is required'),
  emergency_contact_name: Yup.string().required('Emergency Contact Name is required'),
  // ssn: Yup.string(),
  address: Yup.string().required('Address is required'),
  suggestion:Yup.string(),
  captchaVerification: Yup.string().required('Please verify the captcha'),
});

const PatientForm = () => {
  const [captchaValue, setCaptchaValue] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for the submit button
  const inputRef = useRef(null);
  const router=useRouter()
  const {setSnackbar}=useCustomSnackbarStore()

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
      gender: '',
      // employment_status,
      marital_status:'',
      emergency_contact_name:'',
      // ssn:'',
      address:'',
      suggestion:'',
      captchaVerification: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form Submitted", values);
      setLoading(true); // Start loading when submit is triggered
    
      try {
        const questions = values.questions;
        let val = {};
    
        // gender: '',
        // // employment_status,
        // marital_status:'',
        // emergency_contact_name:'',
        // ssn:'',
        // address:'',
        // :'',
        const { firstname, lastname, mobile, email, dob, insurance,gender,marital_status,emergency_contact_name,
          // ssn,
          address,
         } = values;
        val.firstname = firstname;
        val.lastname = lastname;
        val.mobile = mobile;
        val.email = email;
        val.dob = dob;
        val.insurance = insurance;
        val.gender=gender;
        val.marital_status=marital_status;
        val.emergency_contact_name=emergency_contact_name;
        // val.ssn=ssn;
        val.address=address;
        // Check if patient already exists
        const patient_detail = await axios.post('/api/getPatientDetailsByEmail', { email: email });
        if (patient_detail.data.status === true) {
          setSnackbar('warning', 'Patient already exists with this email.');
          return;
        }
    
        console.log("Data being sent to server: ", val);
    
        // Create a new patient
        const response = await axios.post('/api/createPatient', val);
        const patientID = response.data.patientId.CreatePatientResult.PatientID;
        console.log("patient Id",patientID)
    
        if (response.status === 200) {
          try {
            // Add new patient
            // let patientData={
            //   ...values,
            //   patientId: patientID
            // }
            let PatientValues={ ...values };
            PatientValues.patientId=patientID
            const responseNewPatient = await axios.post('/api/addNewPatient', PatientValues);
    
            if (responseNewPatient.data.data.passed === true) {
              // Clone values for emails to avoid mutations
              let emailValues = { ...values };
              emailValues.whitelist = responseNewPatient.data.data.result.whitelist;
    
              // First Email (Create Password)
              try {
                emailValues.template = 'createPasswordTemplate';
                console.log("Sending first email...");
                let mailResp = await axios.post('/api/sendMailAPI', emailValues);
                console.log("Mail response (Password Email):", mailResp);
    
                if (mailResp.status !== 200) {
                  console.warn("First email may have failed. Continuing to second email...");
                }
              } catch (error) {
                console.error("Error sending password email:", error);
                setSnackbar('error', 'Failed to send password creation email.');
              }
    
              // Second Email (Confirmation)
              try {
                emailValues.template = 'patientRegisterationConfirmation';
                console.log("Sending second email...");
                let mailResp1 = await axios.post('/api/sendMailAPI', emailValues);
                console.log("Mail response (Confirmation Email):", mailResp1);
    
                if (mailResp1.status === 200) {
                  console.log("Second email sent successfully.");
                } else {
                  console.warn("Second email may not have been successful. Status:", mailResp1.status);
                }
              } catch (error) {
                console.error("Error sending confirmation email:", error);
                setSnackbar('error', 'Failed to send confirmation email.');
              }
    
              setSnackbar('success', 'Patient added successfully. Emails will be sent shortly.');
              router.push(`/login`);
            }
          } catch (error) {
            console.error('Error in registering patient:', error);
            setSnackbar('error', 'Error registering patient.');
          }
        }
      } catch (error) {
        console.error('Error in submitting form:', error);
        if (error.response && error.response.status === 400) {
          setSnackbar('warning', 'Duplicate Email or Mobile.');
        } else {
          setSnackbar('error', 'An error occurred while submitting the form.');
        }
      } finally {
        setLoading(false); // Always stop loading after operation
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

  const currentDate = new Date();

// Calculate 75 years ago
const minDate = new Date();
minDate.setFullYear(currentDate.getFullYear() - 75);

// Calculate 18 years ago
const maxDate = new Date();
maxDate.setFullYear(currentDate.getFullYear() - 18);

// Format the dates to "YYYY-MM-DD" for input
const minDateFormatted = minDate.toISOString().split('T')[0];
const maxDateFormatted = maxDate.toISOString().split('T')[0];

  return (
    <>
    <Box
          sx={{
            width: '100%',
            // mx: 'auto',
            // my: 4,
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            textAlign:"left",
            bgcolor: '#f5f5f5',
          }}
        >
      <Box sx={{ p: 1, backgroundColor: "#535945", display: 'inline-block', textAlign:"center",alignSelf:"center"}}>
        <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
          How our process works
        </Typography>
      </Box>

      <Box>

        <Box sx={{  mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            Interest form
          </Typography>
        </Box>

        <Box sx={{ ml: "5%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
               Fill out the interest form below.
              </Typography>
            </ListItem>
          </List>
        </Box>

        <Box sx={{  mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            After filling out the interest form
          </Typography>
        </Box>



        <Box sx={{ ml: "5%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
                You will receive an
                email from Kairos Integrative
                Health to create a password.
              </Typography>
            </ListItem>
            {/* <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
              Create a password with KIH  through Tebra (use link in email), where you will be able to schedule your complimentary phone call.
              </Typography>
            </ListItem> */}
          </List>
        </Box>

        <Box sx={{  mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            After creating your password
          </Typography>
        </Box>

        <Box sx={{ ml: "5%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
              You can login to Kairos Integrative Health with your email and password to schedule your complimentary phone call
              </Typography>
            </ListItem>
          </List>
        </Box>


        <Box sx={{  mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            Our team will confirm the complimentary phone
            call appointment
          </Typography>
        </Box>
        <Box sx={{ ml: "5%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
                Keep an eye out on your email for
                confirmation and we will connect with you at the scheduled time
                for a 10-minute phone call. This call will allow you to discuss with
                our provider to see if KIH is a good fit for you.
              </Typography>
            </ListItem>
          </List>
          
        </Box>
        <Box sx={{  mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{  color: "black" }}>
          If you are a new patient looking to establish care with one of our providers, please start by answering the following questions.
          </Typography>
        </Box>
       




      </Box>
      
    <ThemeProvider theme={greenTheme}>
   

    <Typography 
    variant="h6" 
    align="center" 
    gutterBottom 
    sx={{ 
      color: 'navy', 
      wordWrap: 'break-word', 
      fontSize: { xs: '1.2rem', sm: '2rem' },
    }}
  >
    Request a complementary phone call
  </Typography>
          <hr style={{ width: '80%', margin: 'auto', borderColor: 'black' }} />

          <form onSubmit={(e) => {
            e.preventDefault(); // Prevent the default form submission
            formik.handleSubmit(e); // Manually trigger the form submission
          } } onReset={formik.handleReset}>
            {/* Text Fields */}
            <Grid container spacing={2} mt={2}>
        {/* First Name */}
        <Grid item xs={12} sm={6}>
          <TextField
                label={<RequiredLabel label="Patient's First Name" />}

            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={Boolean(formik.touched.firstname && formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Patient's Last Name"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <TextField
           label={<RequiredLabel label="Patient's Email" />}
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        {/* Mobile */}
        <Grid item xs={12} sm={6}>
          <TextField
            label={<RequiredLabel label="Patient's Mobile" />}
            name="mobile"
            type="tel"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            inputProps={{ maxLength: 10 }}
            onKeyPress={(e) => {
              if (!/^[0-9]$/.test(e.key)) {
                e.preventDefault(); // Prevent non-numeric characters
              }
            }}
            error={Boolean(formik.touched.mobile && formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
        </Grid>

        {/* DOB */}
        <Grid item xs={12} sm={6}>
          <TextField
             label={<RequiredLabel label="Patient's Date of Birth" />}
            name="dob"
            type="date"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: minDateFormatted, // Set min date to 75 years ago
              max: maxDateFormatted, // Set max date to 18 years ago
            }}
            fullWidth
            error={Boolean(formik.touched.dob && formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
          />
        </Grid>

        {/* Gender */}
        <Grid item xs={12} sm={6}>
  <FormControl fullWidth error={Boolean(formik.touched.gender && formik.errors.gender)}>
    <InputLabel id="gender-label">Gender</InputLabel>
    <Select
      labelId="gender-label"
      name="gender"
      value={formik.values.gender}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      label={<RequiredLabel label="Gender"/>}
    >
      <MenuItem value="Male">Male</MenuItem>
      <MenuItem value="Female">Female</MenuItem>
      <MenuItem value="Unknown">Unknown</MenuItem>
    </Select>
    {formik.touched.gender && formik.errors.gender && (
      <FormHelperText>{formik.errors.gender}</FormHelperText>
    )}
  </FormControl>
</Grid>

        {/* Address */}
        <Grid item xs={12}>
          <TextField
            label={<RequiredLabel label="Patient's Address" />}
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            multiline
            rows={4}
            error={Boolean(formik.touched.address && formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>

        {/* Marital Status */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={Boolean(formik.touched.marital_status && formik.errors.marital_status)}>
            <InputLabel>Marital Status</InputLabel>
            <Select
              name="marital_status"
              value={formik.values.marital_status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label={<RequiredLabel label="Marital Status"/>}
      fullWidth
            >
      <MenuItem value="A">Annulled</MenuItem>
      <MenuItem value="D">Divorced</MenuItem>
      <MenuItem value="I">Interlocutoru</MenuItem>

      <MenuItem value="L">Legally Seperated</MenuItem>
      <MenuItem value="M">Married</MenuItem>
      <MenuItem value="P">Polygamous</MenuItem>

      <MenuItem value="S">Single/Never Married</MenuItem>
      <MenuItem value="T">Domestic Partner</MenuItem>
      <MenuItem value="W">Widowed</MenuItem>
    </Select>
    {formik.touched.marital_status && formik.errors.marital_status && (
      <Typography color="error" variant="caption">
        {formik.errors.marital_status}
      </Typography>
    )}
  </FormControl>
  </Grid>

{/* Emergency Contact Name */}
<Grid item xs={12} sm={6}>
  <TextField
     label={<RequiredLabel label="Emergency Contact Name" />}
    name="emergency_contact_name"
    value={formik.values.emergency_contact_name}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    error={Boolean(formik.touched.emergency_contact_name && formik.errors.emergency_contact_name)}
    helperText={formik.touched.emergency_contact_name && formik.errors.emergency_contact_name}
  />
</Grid>

{/* Insurance */}
<Grid item xs={12}>
  <TextField
     label={<RequiredLabel label="Insurance" />}
    name="insurance"
    value={formik.values.insurance}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    error={Boolean(formik.touched.insurance && formik.errors.insurance)}
    helperText={formik.touched.insurance && formik.errors.insurance}
  />
</Grid>

{/* Radio Questions */}
{[
  "Do we have permissions to text you?",
  "Are you scheduling an appointment for yourself?",
  "Are you over the age of 18?",
  "Have you been hospitalized or visited the ER for psychiatric reasons within the last 4 weeks?",
  "Are you making this appointment to discuss disability paperwork or seeking care for a work-related injury?",
].map((question, index) => (
  <Grid item xs={12} key={index}>
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
    <Typography variant="caption" color="error">
      {formik.touched.questions?.[index] && formik.errors.questions?.[index]}
    </Typography>
  </Grid>
))}

{/* Captcha */}
<Grid item xs={12} sm={6}>
  <TextField
    label={<RequiredLabel label="Enter Captcha" />}
    name="captchaVerification"
    value={formik.values.captchaVerification}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    error={Boolean(formik.touched.captchaVerification && formik.errors.captchaVerification)}
    helperText={formik.touched.captchaVerification && formik.errors.captchaVerification}
  />
</Grid>
<Grid item xs={12} sm={6}>
  <Typography>{captchaValue}</Typography>
  <IconButton onClick={refreshCaptcha}>
    <RefreshIcon />
  </IconButton>
</Grid>
</Grid>

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
          
      </ThemeProvider>
      </Box>
      </>
  );
};

export default PatientForm;
