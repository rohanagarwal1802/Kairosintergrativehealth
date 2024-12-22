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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DatePicker from "react-datepicker";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "react-datepicker/dist/react-datepicker.css";

function AppointmentFormModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);

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
        employee_id: values.service,
        location: values.location,
        appointmentDate: values.appointmentDate,
      };

      // Simulated API call
      const res = await axios.post("/api/bookAppointmentOnTebra", data);
      if(res.status==='success')
      {
        alert("Appointment created successfully")
      }
      console.log("API response: ", res.data);
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error booking appointment: ", error);
      setLoading(false);
    }
    setSubmitting(false);
  };

  const ExampleCustomInput = React.forwardRef(({ value, onClick, onClear }, ref) => (
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
      error={!value}
      helperText={!value ? "This field is required" : ""}
    />
  ));

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
                error={Boolean(touched.appointmentDate && errors.appointmentDate)}
              >
                <DatePicker
                  selected={values.appointmentDate}
                  onChange={(date) => setFieldValue("appointmentDate", date)}
                  placeholderText="Select appointment date"
                  dateFormat="dd-MM-yyyy"
                  customInput={
                    <ExampleCustomInput
                      onClear={() => setFieldValue("appointmentDate", null)}
                    />
                  }
                />
                {touched.appointmentDate && errors.appointmentDate && (
                  <Typography color="error" variant="caption">
                    {errors.appointmentDate}
                  </Typography>
                )}
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
