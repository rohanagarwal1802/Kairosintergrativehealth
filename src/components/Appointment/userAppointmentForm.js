import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Modal,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DatePicker from "react-datepicker";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "react-datepicker/dist/react-datepicker.css";
import useCustomSnackbarStore from "@/pages/utils/useCustomSnackbarStore";

function AppointmentFormModal({ open, onClose,patientId,getAppointMentData,userDetails }) {
  const [loading, setLoading] = useState(false);
  const {setSnackbar}=useCustomSnackbarStore()

  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    service: Yup.string().required("Please select a service"),
    location: Yup.string().required("Please select a location"),
    appointmentDate: Yup.date()
      .required("Please select a date")
      .typeError("Invalid date"),
  });

  // Form submission
  const handleGenerate = async (values, { setSubmitting }) => {
    setLoading(true);

    try {
      const data = {
        service: values.service,
        location: values.location,
        appointmentDate: values.appointmentDate,
        patientId:patientId
      };

      const res = await axios.post("/api/bookAppointmentOnTebra", data);
      
      // console.log(res.data)
      if (res.data.status === "success") {
        const appointment_id = res.data.appointmentResult.CreateAppointmentResult?.Appointment?.AppointmentId;

        // Augment the data object with the new AppointmentId
        if(appointment_id)
        data.appointmentId = appointment_id;
        const appointmentResp=await axios.post('/api/createNewAppointMent',data)
        let username=userDetails?.firstname+" "+userDetails?.lastname
        let email=userDetails?.email
        let phone=userDetails?.mobile
        let emailValues = { ...data,username:username,email:email,phone:phone };

        // First Email (Create Password)
        try {
          emailValues.template = 'bookAppointmentTemplate';
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
          emailValues.template = 'bookAppointmentConfirmation';
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

        console.log("appresp",appointmentResp.data)
        setSnackbar("success","Appointment created successfully")
        // alert("Appointment created successfully");
      }
      console.log("API response: ", res.data);
      setLoading(false);
     await getAppointMentData()
      onClose();
    } catch (error) {
      console.error("Error booking appointment: ", error);
      setLoading(false);
    }
    setSubmitting(false);
  };

  const ExampleCustomInput = React.forwardRef(
    ({ value, onClick, onClear, error, helperText }, ref) => (
      <TextField
        onClick={onClick}
        value={value || ""}
        label="Appointment Date"
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <IconButton
              edge="end"
              size="small"
              onClick={onClick}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              <ArrowDropDownIcon />
            </IconButton>
          ),
        }}
        fullWidth
        ref={ref}
        error={Boolean(error)} // Only show error if there is an error
        helperText={error ? helperText : ""}
      />
    )
  );

  return (
    <Modal open={open} onClose={onClose} disableScrollLock>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2} sx={{ color: "black" }}>
          Book Appointment
        </Typography>

        <Formik
          initialValues={{
            service: "",
            location: "",
            appointmentDate: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleGenerate}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form>
              {/* Service Selection */}
              <FormControl
                fullWidth
                margin="normal"
                error={Boolean(touched.service && errors.service)}
              >
                <InputLabel>Services</InputLabel>
                <Select
                  name="service"
                  value={values.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Services"
                >
                  <MenuItem value="Phyciatry">Phyciatry</MenuItem>
                  <MenuItem value="Therapy">Therapy</MenuItem>
                  <MenuItem value="Addiction">Addiction</MenuItem>
                  <MenuItem value="Genetic Testing">Genetic Testing</MenuItem>
                  <MenuItem value="CNS-VS Testing">CNS-VS Testing</MenuItem>
                </Select>
                {touched.service && errors.service && (
                  <Typography color="error" variant="caption">
                    {errors.service}
                  </Typography>
                )}
              </FormControl>

              {/* Location Selection */}
              <FormControl
                fullWidth
                margin="normal"
                error={Boolean(touched.location && errors.location)}
              >
                <InputLabel>Location</InputLabel>
                <Select
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Location"
                >
                  <MenuItem value="Tele Health">Tele Health</MenuItem>
                  <MenuItem value="Offline">Offline</MenuItem>
                </Select>
                {touched.location && errors.location && (
                  <Typography color="error" variant="caption">
                    {errors.location}
                  </Typography>
                )}
              </FormControl>

              {/* Date Picker */}
              <FormControl
                fullWidth
                margin="normal"
              >
                <DatePicker
                  selected={values.appointmentDate}
                  onChange={(date) => setFieldValue("appointmentDate", date)}
                  placeholderText="Select appointment date"
                  dateFormat="dd-MM-yyyy"
                  minDate={new Date()} // Disable past dates
                  customInput={
                    <ExampleCustomInput
                      onClear={() => setFieldValue("appointmentDate", null)}
                      error={touched.appointmentDate && errors.appointmentDate}
                      helperText={errors.appointmentDate}
                    />
                  }
                />
              </FormControl>

              {/* Action Buttons */}
              <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  type="submit"
                  disabled={isSubmitting || loading}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Book"
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

AppointmentFormModal.displayName = "AppointmentFormModal";

export default AppointmentFormModal;
