import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  Grid,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  Button,
  Typography,
} from "@mui/material";
import locationOptions from "./LocationOptions";

const LocationFormComponent = () => {
  const [states, setStates] = useState([]);

  // Fetch the list of US states
  
  useEffect(() => {
    fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/states_titlecase.json")
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.error("Error fetching states:", error));
  }, []);


  const availableStates = locationOptions();

// Normalize the state names to lowercase and trim spaces for case-insensitive comparison
const normalizedStates = new Set(states.map(state => state.trim().toLowerCase()));

const filteredAvailableStates = availableStates.filter(
  (location) => !normalizedStates.has(location.value.trim().toLowerCase())
);
  // Form validation schema using Yup
  const validationSchema = Yup.object({
    state: Yup.string().required("Please select a state."),
    preference: Yup.string().required("Please select an option."),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      state: "",
      preference: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
      alert("Form submitted successfully!");
    },
  });
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
           width: '100%',
          //  maxWidth: '600px', // Limit the form's width for better readability
           mx: 'auto',
           mb:"1%",
           p: 3,
           borderRadius: 2,
           boxShadow: 3,
           bgcolor: '#f5f5f5',
         }}
       >
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          {/* US States Dropdown */}
            <Grid container spacing={2} alignItems="center">
                    {/* Full Name, Email, Subject, and Message */}
                    <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <FormLabel sx={{ color: "#333"}}>Select Your State</FormLabel>
            <Select
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
            >
              {/* <MenuItem value="" sx={{ color: "#333"}}>Select a state</MenuItem> */}
              {filteredAvailableStates.map((state) => (
                <MenuItem key={state.abbreviation} value={state.name} sx={{ color: "#333"}}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.state && formik.errors.state && (
              <Typography color="error" variant="body2">
                {formik.errors.state}
              </Typography>
            )}
          </FormControl>
</Grid>

          {/* <Grid item xs={12}> */}
          {/* Radio Button Question */}
          {/* <FormControl component="fieldset" margin="normal">
            <FormLabel sx={{ color: "#333"}}>Do you need Resilience Roundtable or Medication?</FormLabel>
            <RadioGroup
              name="preference"
              value={formik.values.preference}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel
                value="Resilience Roundtable"
                control={<Radio />}
                label="Resilience Roundtable"
                sx={{ color: "#333"}}
              />
              <FormControlLabel
                value="Medication"
                control={<Radio />}
                label="Medication"
                sx={{ color: "#333"}}
              />
            </RadioGroup>
            {formik.touched.preference && formik.errors.preference && (
              <Typography color="error" variant="body2">
                {formik.errors.preference}
              </Typography>
            )}
          </FormControl> */}
            {/* </Grid> */}


            </Grid>
                    {/* <Grid item xs={12}></Grid> */}

          {/* Submit Button */}
          {/* <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button> */}
        </form>
      </Box>
  );
};

export default LocationFormComponent;
