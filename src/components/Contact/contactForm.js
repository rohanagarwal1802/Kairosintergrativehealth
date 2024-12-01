import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  TextField,
  Rating,
  Button,
  IconButton,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';

const validationSchema = Yup.object({
  full_name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
  captchaVerification: Yup.string().required('Please verify the captcha'),
  terms: Yup.boolean().oneOf([true], 'You must accept the Terms & Conditions and Privacy Policies'),
});

const ContactForm = ({ getReviews }) => {
  const [captchaValue, setCaptchaValue] = React.useState('');

  const generateCaptcha = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  React.useEffect(() => {
    setCaptchaValue(generateCaptcha());
  }, []);

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      subject: '',
      message: '',
      captchaVerification: '',
      terms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Form Data', values);
      try {
        const resp = await axios.post('/api/addReview', values);
        getReviews();
        alert('Form submitted successfully');
        console.log('Response:', resp);
      } catch (error) {
        console.error('Error submitting form:', error);
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
      <Typography component="span" color="error" sx={{ ml: 0.5 }}>
        *
      </Typography>
    </Typography>
  );

  return (
    <>
      <Box
        sx={{
          width: '50%',
          mx: 'auto',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: '#f5f5f5',
          mb: 4,
        }}
      >
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          {/* Full Name, Email, Subject, and Message */}
          <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                label={<RequiredLabel label="Full Name" />}
                name="full_name"
                value={formik.values.full_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
              />
              {formik.touched.full_name && formik.errors.full_name && (
                <Typography color="error">{formik.errors.full_name}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label={<RequiredLabel label="Email" />}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
              />
              {formik.touched.email && formik.errors.email && (
                <Typography color="error">{formik.errors.email}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label={<RequiredLabel label="Subject" />}
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
              />
              {formik.touched.subject && formik.errors.subject && (
                <Typography color="error">{formik.errors.subject}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label={<RequiredLabel label="Message" />}
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                multiline
                rows={4}
              />
              {formik.touched.message && formik.errors.message && (
                <Typography color="error">{formik.errors.message}</Typography>
              )}
            </Grid>

            {/* Captcha */}
            <Grid item xs={12}>
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
              {formik.touched.captchaVerification && formik.errors.captchaVerification && (
                <Typography color="error">{formik.errors.captchaVerification}</Typography>
              )}
            </Grid>
          </Grid>

          {/* Terms and Conditions Checkbox */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="terms"
                  color="primary"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label={
                <Typography variant="body2">
                  By checking this box, you consent to receive text messages and emails at the
                  phone/email address provided. Standard messaging and data rates may apply. By
                  clicking below, you agree to our{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policies
                  </a>
                  .
                </Typography>
              }
            />
            {formik.touched.terms && formik.errors.terms && (
              <Typography color="error">{formik.errors.terms}</Typography>
            )}
          </Grid>

          {/* Submit and Reset Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="outlined" color="secondary" type="reset">
              Reset
            </Button>
            <Button variant="contained" color="yellow" type="submit">
              Send Message
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ContactForm;
