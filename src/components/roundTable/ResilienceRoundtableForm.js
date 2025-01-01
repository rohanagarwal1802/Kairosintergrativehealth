import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormHelperText 
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import FullScreenDialog from './FullScreenDialog';
import axios from 'axios';


const greenTheme = createTheme({
  palette: {
    primary: { main: '#6F7863' },
    secondary: { main: '#81c784' },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            borderColor: '#000',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: '#000',
          },
          '& .MuiInputBase-input': {
            color: '#000',
          },
        },
      },
    },
  },
});

const StyledBox = styled(Box)(({ theme }) => ({
  border: '1px solid #000',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const ResilienceRoundtableForm = () => {
  const [loading, setLoading] = useState(false);
  const [open,setOpen]=useState(false)
  const [scanner,setScanner]=useState(null) 
  const [type,setType]=useState(null)
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    textPermission: false,
    attending: false,
    over18: false,
    bringingFriend: false,
    friendFirstName: '',
    friendLastName: '',
    friendDob: '',
    friendPhoneNumber: '',
    friendTextPermission: false,
    friendEmail: '',
    payment: '',
    memberName: '',
    firstAttendeeName: '',
    secondAttendeeName: '',
  };
  
  const phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .matches(emailRegex, 'Invalid email format')
      .required('Email is required'),
    phoneNumber: Yup.string()
      .matches(phoneNumberRegex, 'Invalid phone number format')
      .required('Phone number is required'),
    dob: Yup.date().required('Date of birth is required'),
    textPermission: Yup.boolean().required('Text permission is required'),
    attending: Yup.boolean()
      .oneOf([true], 'Please indicate if you are attending')
      .required(),
    over18: Yup.boolean()
      .oneOf([true], 'You must be over 18')
      .required(),
    bringingFriend: Yup.boolean().required(),
    friendFirstName: Yup.string().when('bringingFriend', {
      is:(value) => value === true, // Ensure that 'is' is a boolean or a function returning a boolean
      then: Yup.string().required("Friend's first name is required"),
      otherwise: Yup.string(),
    }),
    friendLastName: Yup.string().when('bringingFriend', {
      is:(value) => value === true, // Ensure the condition is evaluated correctly
      then: Yup.string().required("Friend's last name is required"),
      otherwise: Yup.string(),
    }),
    friendDob: Yup.date().when('bringingFriend', {
      is:(value) => value === true, // Check if bringingFriend is true
      then: Yup.date().required("Friend's date of birth is required"),
      otherwise: Yup.date(),
    }),
    friendPhoneNumber: Yup.string().when('bringingFriend', {
      is:(value) => value === true, 
      then: Yup.string()
        .matches(phoneNumberRegex, 'Invalid phone number format')
        .required("Friend's phone number is required"),
      otherwise: Yup.string(),
    }),
    friendEmail: Yup.string().when('bringingFriend', {
      is:(value) => value === true,
      then: Yup.string()
        .email('Invalid email format')
        .required("Friend's email is required"),
      otherwise: Yup.string(),
    }),
    payment: Yup.string().required('Payment type is required'),
    memberName: Yup.string().when('payment', {
      is:(value) => value === 'member', // Here, ensure the condition is the exact value you're expecting
      then: Yup.string().required('Member name is required when payment is "member"'),
      otherwise: Yup.string(),
    }),
    firstAttendeeName: Yup.string().when('payment', {
      is: (value) => value ==='member',
      then: Yup.string().required('First attendee name is required when payment is "member"'),
      otherwise: Yup.string(),
    }),
    secondAttendeeName: Yup.string().when('payment', {
      is:(value) => value === 'member',
      then: Yup.string().required('Second attendee name is required when payment is "member"'),
      otherwise: Yup.string(),
    }),
  });
  

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log(values);
      setLoading(true);
  
      // Set the scanner image based on payment type
      if (values.payment === 'guest') {
        setScanner('/guestScanner.jpeg');
      } else {
        setScanner('/memberScanner.jpeg');
      }
  
      // Submit form data using axios
      const resp = await axios.post('/api/bookRoundTable', values);
  
      // Set the payment type and reset form
      setType(values.payment);
  
      // Reset the form values and set submitting state to false
      resetForm(); // This is the correct method to reset the form
  
      console.log(resp);
      setOpen(true); // Open the confirmation modal or message
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setLoading(false);
      setSubmitting(false); // Ensure the form submission is complete
    }
  };
  
  

  return (
    <>
    <ThemeProvider theme={greenTheme}>
      <StyledBox sx={{  mx: 'auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
          Resilience Roundtable Registration
        </Typography>

      
          <>
          <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, touched, errors, handleChange, handleBlur, isSubmitting }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                          error={touched.firstName && Boolean(errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                          InputLabelProps={{
                            sx: {
                              backgroundColor: 'white', // Prevent overlap by setting background
                              padding: '0 4px', // Add padding around the label
                              transform: 'translate(14px, -6px)', // Position label slightly upwards
                            },
                            shrink: true, // Ensure the label is always visible
                          }} />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                          error={touched.lastName && Boolean(errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                          InputLabelProps={{
                            sx: {
                              backgroundColor: 'white', // Prevent overlap by setting background
                              padding: '0 4px', // Add padding around the label
                              transform: 'translate(14px, -6px)', // Position label slightly upwards
                            },
                            shrink: true, // Ensure the label is always visible
                          }} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          InputLabelProps={{
                            sx: {
                              backgroundColor: 'white', // Prevent overlap by setting background
                              padding: '0 4px', // Add padding around the label
                              transform: 'translate(14px, -6px)', // Position label slightly upwards
                            },
                            shrink: true, // Ensure the label is always visible
                          }} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phoneNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                          error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                          InputLabelProps={{
                            sx: {
                              backgroundColor: 'white', // Prevent overlap by setting background
                              padding: '0 4px', // Add padding around the label
                              transform: 'translate(14px, -6px)', // Position label slightly upwards
                            },
                            shrink: true, // Ensure the label is always visible
                          }} />
                      </Grid>
                      <Grid item xs={6}>
                      <TextField
  fullWidth
  label="Date of Birth"
  name="dob"
  type="date"
  onChange={handleChange}
  onBlur={handleBlur}
  value={values.dob}
  error={touched.dob && Boolean(errors.dob)}
  helperText={touched.dob && errors.dob}
  InputLabelProps={{
    shrink: true, // Ensures the label is always displayed in a shrunk state
    sx: {
      backgroundColor: 'white', // Prevent overlap visually
      padding: '0 4px', // Adds space for clarity
      transform: 'translate(14px, -6px)', // Adjusts the label position above the field
    },
  }}
  inputProps={{
    max: new Date().toISOString().split('T')[0], // Disable future dates
  }}
/>

                      </Grid>
                      <Grid item xs={6} sm={6}></Grid>

                      <Grid item xs={6}>
                        <FormControlLabel
                          control={<Checkbox
                            name="textPermission"
                            checked={values.textPermission}
                            onChange={handleChange} />}
                          label="Do we have permission to text you?"
                          sx={{ color: 'black' }} />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={<Checkbox
                            name="attending"
                            checked={values.attending}
                            onChange={handleChange} />}
                          label="Are you planning to attend the Resilience Roundtable?"
                          sx={{ color: 'black' }} />
                        {touched.attending && errors.attending && (
                          <Typography color="error">{errors.attending}</Typography>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={<Checkbox
                            name="over18"
                            checked={values.over18}
                            onChange={handleChange} />}
                          label="Are you over the age of 18 ?"
                          sx={{ color: 'black' }} />
                        {touched.over18 && errors.over18 && (
                          <Typography color="error">{errors.over18}</Typography>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={<Checkbox
                            name="bringingFriend"
                            checked={values.bringingFriend}
                            onChange={handleChange} />}
                          label="Are you bringing a friend or family member?"
                          sx={{ color: 'black' }} />
                      </Grid>

                      {values.bringingFriend && (
                        <>
                          <Grid item xs={6} sm={6}>
                            <TextField
                              fullWidth
                              label="Friend's First Name"
                              name="friendFirstName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.friendFirstName}
                              error={touched.friendFirstName && Boolean(errors.friendFirstName)}
                              helperText={touched.friendFirstName && errors.friendFirstName}
                              InputLabelProps={{
                                sx: {
                                  backgroundColor: 'white', // Prevent overlap by setting background
                                  padding: '0 4px', // Add padding around the label
                                  transform: 'translate(14px, -6px)', // Position label slightly upwards
                                },
                                shrink: true, // Ensure the label is always visible
                              }} />
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <TextField
                              fullWidth
                              label="Friend's Last Name"
                              name="friendLastName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.friendLastName}
                              error={touched.friendLastName && Boolean(errors.friendLastName)}
                              helperText={touched.friendLastName && errors.friendLastName}
                              InputLabelProps={{
                                sx: {
                                  backgroundColor: 'white', // Prevent overlap by setting background
                                  padding: '0 4px', // Add padding around the label
                                  transform: 'translate(14px, -6px)', // Position label slightly upwards
                                },
                                shrink: true, // Ensure the label is always visible
                              }} />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="Friend's Date of Birth"
                              name="friendDob"
                              type="date"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.friendDob}
                              error={touched.friendDob && Boolean(errors.friendDob)}
                              helperText={touched.friendDob && errors.friendDob}
                              InputLabelProps={{
                                sx: {
                                  backgroundColor: 'white', // Prevent overlap by setting background
                                  padding: '0 4px', // Add padding around the label
                                  transform: 'translate(14px, -6px)', // Position label slightly upwards
                                },
                                shrink: true, // Ensure the label is always visible
                              }} />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="Friend's Phone Number"
                              name="friendPhoneNumber"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.friendPhoneNumber}
                              error={touched.friendPhoneNumber && Boolean(errors.friendPhoneNumber)}
                              helperText={touched.friendPhoneNumber && errors.friendPhoneNumber}
                              InputLabelProps={{
                                sx: {
                                  backgroundColor: 'white', // Prevent overlap by setting background
                                  padding: '0 4px', // Add padding around the label
                                  transform: 'translate(14px, -6px)', // Position label slightly upwards
                                },
                                shrink: true, // Ensure the label is always visible
                              }} />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="Friend's Email"
                              name="friendEmail"
                              type="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.friendEmail}
                              error={touched.friendEmail && Boolean(errors.friendEmail)}
                              helperText={touched.friendEmail && errors.friendEmail}
                              InputLabelProps={{
                                sx: {
                                  backgroundColor: 'white', // Prevent overlap by setting background
                                  padding: '0 4px', // Add padding around the label
                                  transform: 'translate(14px, -6px)', // Position label slightly upwards
                                },
                                shrink: true, // Ensure the label is always visible
                              }} />

                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={<Checkbox
                                name="friendTextPermission"
                                checked={values.friendTextPermission}
                                onChange={handleChange} />}
                              label="Do we have permission to text your friend or family member?"
                              sx={{ color: 'black' }} />
                          </Grid>


                        </>
                      )}

<Grid item xs={6}>
  <FormControl 
    component="fieldset" 
    error={touched.payment && Boolean(errors.payment)}
  >
    <FormLabel component="legend">
      Which payment option do you prefer?
    </FormLabel>
    <RadioGroup
      row
      name="payment"
      value={values.payment}
      onChange={handleChange}
    >
      <FormControlLabel
        value="guest"
        control={<Radio sx={{ color: "black" }} />}
        label={
          <Typography sx={{ color: "black" }}>
            Guest Access - $30 per session
          </Typography>
        }
      />
      <FormControlLabel
        value="member"
        control={<Radio sx={{ color: "black" }} />}
        label={
          <Typography sx={{ color: "black" }}>
            Member Discounted Plan - $21 per session plus one free Friend / Family Member
          </Typography>
        }
      />
    </RadioGroup>
    {touched.payment && errors.payment && (
      <FormHelperText>{errors.payment}</FormHelperText>
    )}
  </FormControl>
</Grid>

                      <Grid item xs={6}/>
                      {values.payment === 'member' && (
                        <><Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="Name of person filling out form"
                              name="memberName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.memberName}
                              error={touched.memberName && Boolean(errors.memberName)}
                              helperText={touched.memberName && errors.memberName}
                              InputLabelProps={{
                                shrink: true, // Ensures the label is always displayed in a shrunk state
                                sx: {
                                  backgroundColor: 'white', // Prevent overlap visually
                                  padding: '0 4px', // Adds space for clarity
                                  transform: 'translate(14px, -6px)', // Adjusts the label position above the field
                                },
                              }}  />
                          </Grid><Grid item xs={6}>
                              <TextField
                                fullWidth
                                label="Name of first attendee"
                                name="firstAttendeeName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstAttendeeName} 
                                error={touched.firstAttendeeName && Boolean(errors.firstAttendeeName)}
                                helperText={touched.firstAttendeeName && errors.firstAttendeeName}
                                InputLabelProps={{
                                  shrink: true, // Ensures the label is always displayed in a shrunk state
                                  sx: {
                                    backgroundColor: 'white', // Prevent overlap visually
                                    padding: '0 4px', // Adds space for clarity
                                    transform: 'translate(14px, -6px)', // Adjusts the label position above the field
                                  },
                                }} />
                            </Grid><Grid item xs={6}>
                              <TextField
                                fullWidth
                                label="Name of second attendee"
                                name="secondAttendeeName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.secondAttendeeName} 
                                error={touched.secondAttendeeName && Boolean(errors.secondAttendeeName)}
                                helperText={touched.secondAttendeeName && errors.secondAttendeeName}
                                InputLabelProps={{
                                  shrink: true, // Ensures the label is always displayed in a shrunk state
                                  sx: {
                                    backgroundColor: 'white', // Prevent overlap visually
                                    padding: '0 4px', // Adds space for clarity
                                    transform: 'translate(14px, -6px)', // Adjusts the label position above the field
                                  },
                                }} />
                            </Grid></>
                      )}
                    </Grid>
             <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </Button>

                  

                </Box>
              </Form>
            )}
          </Formik></>
      
      </StyledBox>

    </ThemeProvider>
    {open && <FullScreenDialog open={open} setOpen={setOpen} scanner={scanner} type={type}/>}
    </>
  );
};

export default ResilienceRoundtableForm;
