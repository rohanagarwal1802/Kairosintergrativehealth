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
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';

const validationSchema = Yup.object({
  full_name: Yup.string().required('Full Name is required'),
  publishing_name: Yup.string().required('Publishing Name is required'),
  services_availed: Yup.string().required('Services Availed is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  review: Yup.string().required('Review is required'),
  captchaVerification: Yup.string().required('Please verify the captcha'),
  rating: Yup.number()
    .required('Rating is required')
    .min(1, 'Rating must be at least 1 star')
    .max(5, 'Rating cannot exceed 5 stars')
});

const ReviewForm = ({getReviews}) => {
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
      publishing_name: '',
      services_availed: '',
      email: '',
      review: '',
      captchaVerification: '',
      rating: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Form Data', values);
      try {
        const resp = await axios.post('/api/addReview', values);
        getReviews();
        alert('Review submitted successfully');
        console.log('Response:', resp);
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    },
    onReset: () => {
      setCaptchaValue(generateCaptcha());
    }
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
    <>
      <Box sx={{ p: 1, backgroundColor: "#DCEFEF", display: 'inline-block', ml: "5%" }}>
        <Typography variant="body1" sx={{ color: "#043149", fontWeight: "bold" }}>
          WRITE A REVIEW
        </Typography>
      </Box>
      <Box sx={{ ml: "5%", mt: "1%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
          We’d love to know your experience
        </Typography>
      </Box>
      <Box sx={{ ml: "5%", mt: "1%" }}>
        <Typography variant="body2" sx={{ color: "black" }}>
          Thank you for being part of our community! Your words can make a difference. Share how we've helped you.
        </Typography>
      </Box>

      <Box sx={{ width: { xs: '100%', sm: '70%' }, mx: 'auto', my: 4, p: 3, borderRadius: 2, boxShadow: 3, bgcolor: '#f5f5f5' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'black' }}>
          Rate your experience with us
        </Typography>
        <hr style={{ width: '80%', margin: 'auto', borderColor: 'black' }} />

        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          {/* Full Name and Publishing Name */}
          <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
  <Grid item xs={12} sm={4}>
    <TextField
      label={<RequiredLabel label="Full Name" />}
      name="full_name"
      value={formik.values.full_name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      fullWidth
      InputLabelProps={{ style: { height: '2em' } }} // Adjust height to align labels
    />
   {formik.touched.full_name && formik.errors.full_name ? (
  <Typography color="error">{formik.errors.full_name}</Typography>
) : (
  <Typography variant="caption" sx={{ color: 'gray', mt: 0.5 }}>
    Your name will be kept private.
  </Typography>
)}
  </Grid>

  <Grid item xs={12} sm={4}>
    <TextField
      label={<RequiredLabel label="Publishing Name" />}
      name="publishing_name"
      value={formik.values.publishing_name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      fullWidth
      InputLabelProps={{ style: { height: '2em' } }} // Ensure height matches Full Name field
    />
    {formik.touched.publishing_name && formik.errors.publishing_name ? (
      <Typography color="error">{formik.errors.publishing_name}</Typography>
    ): (
        <Typography variant="caption" sx={{ color: 'gray'}}>
          This name will be shown on website.
        </Typography>
      )}
  </Grid>

  <Grid item xs={12} sm={4}>
  <TextField
    label={<RequiredLabel label="Services Availed" />}
    name="services_availed"
    value={formik.values.services_availed}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
  />
  {formik.touched.services_availed && formik.errors.services_availed ? (
    <Typography color="error">{formik.errors.services_availed}</Typography>
  ): (
        <Typography variant="caption" sx={{ color: 'gray', mt: 0.5 }}>
          Please enter the service availed by you.
        </Typography>
      )}
</Grid>


<Grid item xs={12} sm={6}>
            <TextField
              label={<RequiredLabel label="Email" />}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              helperText="Your email will be kept private."
            />
            {formik.touched.email && formik.errors.email && (
              <Typography color="error">{formik.errors.email}</Typography>
            )}
</Grid>
 {/* Rating */}
   {/* Rating and Review */}
   <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography  sx={{ mr: 1 }}>
                  <RequiredLabel label="Rating" />
                </Typography>
                <Rating
                  name="rating"
                  value={formik.values.rating}
                  onChange={formik.handleChange}
                />
              </Box>
              {formik.touched.rating && formik.errors.rating && (
                <Typography color="error">{formik.errors.rating}</Typography>
              )}
            </Grid>
<Grid item xs={12} sm={6}>
            <TextField
              label={<RequiredLabel label="Review" />}
              name="review"
              value={formik.values.review}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              multiline
              rows={4}
              helperText="Share your experience in detail."
            />
            {formik.touched.review && formik.errors.review && (
              <Typography color="error">{formik.errors.review}</Typography>
            )}
          </Grid>
         
         

          {/* Captcha */}
          <Grid item xs={12} sm={6}>
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
          {/* Submit and Reset Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
           
            <Button variant="outlined" color="secondary" type="reset">
              Reset
            </Button>
            <Button variant="warning" color="warning" type="submit">
              Submit Form
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ReviewForm;
