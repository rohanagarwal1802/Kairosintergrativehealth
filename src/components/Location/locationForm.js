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
import MessageInfoDialog from "./locationMessage";
import useUserStore from "../useUserStore";

const LocationFormComponent = ({setLocation,locationDialogClose}) => {
  const [states, setStates] = useState([
  ]);
  const [msgDialogOpen,setMsgDialogOpen]=useState(false);

  const availableLocations=locationOptions();
  const {preferedLocation}=useUserStore();
  
  useEffect(()=>{

    let allStates=["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
    "Wisconsin", "Wyoming"]
    const normalizedAvailable = new Set(
      availableLocations.map(loc => loc.value.trim().toLowerCase())
    );
    
    // Filter states that are NOT in availableLocations
    const filteredStates = allStates.filter(
      state => !normalizedAvailable.has(state.toLowerCase())
    );

    // console.log(filteredStates)
    setStates(filteredStates)
  },[])
  
  

  // // Fetch the list of US states
  // useEffect(() => {
  //   fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/states_titlecase.json")
  //     .then((response) => response.json())
  //     .then((data) => setStates(data))
  //     .catch((error) => console.error("Error fetching states:", error));
  // }, []);

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

  const handleChange = async (event) => {
    await formik.setFieldValue(event.target.name, event.target.value); // Ensure state update
    setMsgDialogOpen(true); // Open dialog AFTER update
  };
  
  return (
    <>
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
  onChange={handleChange} // Uses the updated function
  onBlur={formik.handleBlur}
  error={formik.touched.state && Boolean(formik.errors.state)}
>

              {/* <MenuItem value="" sx={{ color: "#333"}}>Select a state</MenuItem> */}
              {states.map((state,index) => (
                <MenuItem key={index} value={state} sx={{ color: "#333"}}>
                  {state}
                </MenuItem>
              ))}
            </Select>
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
      {
        msgDialogOpen && <MessageInfoDialog open={msgDialogOpen} onClose={()=>setMsgDialogOpen(false)} 
        state={formik.values.state} locationDialogClose={locationDialogClose}/>
      }
      </>
  );
};

export default LocationFormComponent;
