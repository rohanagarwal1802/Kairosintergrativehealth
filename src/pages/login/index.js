// ** React Imports
import { useState, useEffect } from "react";
import axios from "axios";
import BlankLayout from "@/components/blankLayout";

// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";
import useCustomSnackbarStore from "../utils/useCustomSnackbarStore";

// ** MUI Components
import {
  IconButton,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Checkbox,
  Card,
  CardContent,
  styled,
  InputAdornment,
  useMediaQuery,
  CircularProgress
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// ** Form Validation
import { useFormik } from "formik";
import * as Yup from "yup";

// ** Icons Imports
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useUserStore from "@/components/useUserStore";

const LinkStyled = styled("Typography")({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: "#007BFF",
  "&:hover": {
    textDecoration: "underline",
  },
});

const FormControlLabelStyled = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const LoginPage = () => {
  const [values, setValues] = useState({ password: "", showPassword: false });
  const [mfa, setMfa] = useState(false);
  const [otpTimer, setOtpTimer] = useState(10);
  const { expanded, setExpanded,setPageDisplay,toResetPassword,setResetPassword } = useUserStore();
  const [loading,setLoading]=useState(false)
  const {setSnackbar}=useCustomSnackbarStore()



  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(()=>{
    setPageDisplay("login")
  },[])

  useEffect(() => {
    let timerInterval;
    if (mfa && otpTimer > 0) {
      timerInterval = setInterval(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [mfa, otpTimer]);

  const openRequestedAccount = () => {
    setExpanded("panel2");
    router.push("/bookanappointment");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("Invalid email format") // Validates the general email format
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ) // Ensures stricter matching for email addresses
    .required("Email is required"), // Ensures it's not left empty
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
      
        const response = await axios.post("/api/login", values);
        const { status } = response;
        if (status === 200) {
          localStorage.setItem("login", "true");
         
         await router.reload();
         setSnackbar('success','Logged in Successfully')
        //  setLogin(true)
         
        } else if (status === 201) {
          setMfa(true);
        }
      } catch (error) {
        if(error.status===403)
        {
          console.log(error)
          setSnackbar("error",error.response.data.message)
          // alert(error.response.data.message)
        }
        setLoading(false)
        // Handle errors (e.g., 401 or 404)
      }
      finally{
        
      }
    },
  });

  const handleClickShowPassword = () => {
    setValues((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleForgotPassword=async ()=>{
    if(formik.values.email==="")
      {
        setSnackbar("warning","Please enter email")
        // alert("Please enter email")
        return
      }
      await formik.setFieldTouched("email", true); // Mark the field as touched
    if (formik.errors.email) {
      setSnackbar("warning","Email is invalid")
      // alert("Email is invalid!");
      return
    } 
    try{
      const patient_detail=await axios.post('/api/getPatientDetailsByEmail',{email:formik.values.email})
      // console.log("Patient Details ",patient_detail)
if(patient_detail.data.status===true)
{
let token=patient_detail.data.patient.whitelist
   await setResetPassword(true)
   router.push(`/?verify=${token}`)

    }
    else
    {
      setSnackbar("error","Patient does not exist with this email")
      // alert("Patient does not exist with this email")
      return
    }
  }
  catch(error)
  {
    console.log(error)
  }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        maxHeight: "100vh", // Prevent scrolling
        overflow: "hidden", // Hide overflow
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#535945", // Light #535945 background
        padding: isMobile ? 2 : 4,
        width: "100vw",
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card
            sx={{
              zIndex: 1,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <CardContent>
              {/* Logo */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src="/logo.png" alt="Logo" style={{ width: 90 }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#007BFF",
                  }}
                >
                  Kairos Integrative Health
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary">
                  Your health, our priority
                </Typography>
              </Box>
              {!mfa ? (
                <>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ fontWeight: "bold", mb: 3 }}
                  >
                    Login to Your Account
                  </Typography>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="email"
                          type="email"
                          placeholder="Email"
                          {...formik.getFieldProps("email")}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="password"
                          type={values.showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...formik.getFieldProps("password")}
                          error={
                            formik.touched.password && Boolean(formik.errors.password)
                          }
                          helperText={formik.touched.password && formik.errors.password}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {values.showPassword ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box display="flex" alignItems="center">
                            {/* <Checkbox />
                            <Typography>Remember Me</Typography> */}
                          </Box>
                          <LinkStyled sx={{ cursor: 'pointer' }} onClick={handleForgotPassword}>
      Forgot Password?
    </LinkStyled>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          size="large"
                          variant="contained"
                          color="primary"
                          disabled={loading}
                          type="submit"
                        >
                        {loading ? (
                                        <CircularProgress size={24} sx={{ color: 'white' }} />
                                      ) : (
                                        'Login'
                                      )}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
  <Typography variant="body2">
    New on our platform?{" "}
    <Link href="#" passHref  onClick={(e) => { e.preventDefault(); openRequestedAccount(); }}>
    <LinkStyled>   Request an account</LinkStyled>
    </Link>
  </Typography>
</Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2">
                      <Link href="/">
                        <LinkStyled>Go To Home Page</LinkStyled>
                      </Link>
                    </Typography>
                  </Box>
                </>
              ) : (
                <Typography align="center">OTP Authentication...</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;

LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
