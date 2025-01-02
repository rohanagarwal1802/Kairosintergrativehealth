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
  Select, MenuItem, InputLabel, FormControl ,FormControlLabel,Checkbox,
  CircularProgress
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import useCustomSnackbarStore from '@/pages/utils/useCustomSnackbarStore';

const validationSchema = Yup.object({
  full_name: Yup.string().required('Full Name is required'),
  publishing_name: Yup.string().required('Publishing Name is required'),
  services_availed: Yup.string().required('Services Availed is required'),
  designation: Yup.string().required('Designation is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  review: Yup.string().required('Review is required'),
  captchaVerification: Yup.string().required('Please verify the captcha'),
 
});

const ReviewForm = ({getReviews}) => {
  const [captchaValue, setCaptchaValue] = React.useState('');
  const [loading,setLoading]=React.useState(false)
  const {setSnackbar}=useCustomSnackbarStore()

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
      designation:'',
      email: '',
      public:false,
      review: '',
      approval_status:'pending',
      captchaVerification: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Form Data', values);
      try {
        setLoading(true)
        const resp = await axios.post('/api/addReview', values);
        if(formik.values.public===true)
        getReviews();

          // Reset the form after submission
    formik.resetForm();
    
    // Reset the captcha value
    setCaptchaValue(generateCaptcha());
        setSnackbar("success","Review submitted successfully")
        // alert('Review submitted successfully');
        console.log('Response:', resp);
      } catch (error) {
        console.error('Error submitting review:', error);
      }
      finally{
        setLoading(false)
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
      <Box sx={{ p: 1, backgroundColor: "#535945", display: 'inline-block', ml: "5%" }}>
        <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
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
  <FormControl fullWidth variant="outlined" sx={{ marginTop: 2 }}>
    <InputLabel id="services-availed-label"><RequiredLabel label="Services Availed" /></InputLabel>
    <Select
      labelId="services-availed-label"
      id="services_availed"
      name="services_availed"
      value={formik.values.services_availed}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      label="Services Availed"
      fullWidth
      
    >
      <MenuItem value="Psychiatry">Psychiatry</MenuItem>
      <MenuItem value="Therapy">Therapy</MenuItem>
      <MenuItem value="Addiction">Addiction</MenuItem>
      <MenuItem value="Genetic testing">Genetic testing</MenuItem>
      <MenuItem value="CNSVS">CNSVS</MenuItem>
    </Select>
  </FormControl>
  {formik.touched.services_availed && formik.errors.services_availed ? (
    <Typography color="error">{formik.errors.services_availed}</Typography>
  ) : (
    <Typography variant="caption" sx={{ color: 'gray', mt: 0.5 }}>
      Please enter the service availed by you.
    </Typography>
  )}
</Grid>
<Grid item xs={12} sm={4}>
  <TextField
    label={<RequiredLabel label="Designation" />}
    name="designation"
    value={formik.values.designation}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
  />
  {formik.touched.designation && formik.errors.designation ? (
    <Typography color="error">{formik.errors.designation}</Typography>
  ): (
        <Typography variant="caption" sx={{ color: 'gray', mt: 0.5 }}>
          Please enter your designation.
        </Typography>
      )}
</Grid>

<Grid item xs={12} sm={8}>
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
            <TextField
              label={<RequiredLabel label="Leave A Review" />}
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
          <Grid item xs={12}>
                                      <FormControlLabel
                                        control={<Checkbox
                                          name="public"
                                          checked={formik.values.public}
                                          onChange={formik.handleChange}
                                          />}
                                        label="Is it okay to post your review to Kairos Integrative Health’s
                                        website"
                                        sx={{ color: 'black' }} />
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
            <Button variant="warning" color="warning" type="submit" disabled={loading}>
              {loading ? (
                             <CircularProgress size={24} sx={{ color: 'white' }} />
                           ) : (
                             'Submit Form'
                           )}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ReviewForm;
