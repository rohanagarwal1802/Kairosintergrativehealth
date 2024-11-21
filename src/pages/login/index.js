// //login
// // ** React Imports
// import { useState, useEffect } from "react";

// import axios from "axios";
// // ** Next Imports
// import Link from "next/link";
// import { useRouter } from "next/router";

// // ** MUI Components
// import Image from "next/image";
// import {
//   IconButton,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Box,
//   Checkbox,
//   Card,
//   CardContent,
//   styled,
//   InputAdornment,
// } from "@mui/material";

// import { useFormik } from "formik";
// import * as Yup from "yup";

// import MuiFormControlLabel from "@mui/material/FormControlLabel";
// // ** Icons Imports
// // import EyeOutline from "mdi-material-ui/EyeOutline";
// // import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// import OtpInput from "src/components/settings/SecurityContent/OtpInput";

// //state managemnet
// import useCustomSnackbarStore from "src/pages/store/useCustomSnackbarStore";

// const LinkStyled = styled("a")(({ theme }) => ({
//   fontSize: "0.875rem",
//   textDecoration: "none",
//   color: theme.palette.primary.main,
// }));

// const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
//   "& .MuiFormControlLabel-label": {
//     fontSize: "0.875rem",
//     color: theme.palette.text.secondary,
//   },
// }));

// const LoginPage = () => {
//   const { setSnackbar } = useCustomSnackbarStore();
//   const [values, setValues] = useState({
//     password: "",
//     showPassword: false,
//   });
//   const [mfa, setMfa] = useState(false);

//   const [inputValues, setInputValues] = useState(Array(6).fill(""));
//   const [otpTimer, setOtpTimer] = useState(10);

//   useEffect(() => {
//     let timerInterval;
//     if (mfa && otpTimer > 0) {
//       timerInterval = setInterval(() => {
//         setOtpTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//     } else if (otpTimer === 0) {
//       clearInterval(timerInterval);
//     }
//     return () => clearInterval(timerInterval);
//   }, [mfa, otpTimer]);

//   const resendOtp = async () => {
//     try {
//       const response = await axios.get("/api/resendOtp");
//       setOtpTimer(60);
//     } catch (error) {
//       if (typeof window !== "undefined") {
//         window.location.href = "/"; // Redirect to "/"
//         // setSnackbar("error", maximum attempt reached);
//       }
//     }
//   };

//   // ** Hook
//   const router = useRouter();

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },

//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post("/api/login", values);
//         const { status } = response;
//         switch (status) {
//           case 200:
//             localStorage.setItem("login", "true");
//             router.reload();
//             break;
//           case 201:
//             setMfa(true);
//             break;
//           case 225: //User is Inactive"
//             setSnackbar("error", `User is inactive `);
//             break;
//           default:
//             setSnackbar("error", `Internal Server Error `);
//             break;
//         }
//       } catch (error) {
//         const { status } = error.response;
//         switch (status) {
//           case 401: //Wrong Password
//             setSnackbar("error", `wrong credentials `);
//             break;
//           case 404: //invalid email
//             setSnackbar("error", `user not found `);
//             break;
//           default:
//             setSnackbar("error", `Internal Server Error `);
//             break;
//         }
//       }
//     },
//   });

//   // const formik = useFormik({
//   //   initialValues: {
//   //     email: "",
//   //     password: "",
//   //   },
//   //   validationSchema: validationSchema,

//   //   onSubmit: async (values) => {
//   //   //  debugger
//   //     try {
//   //       const response = await axios.post("/api/login", values);
//   //       console.log("response", response)
//   //       const defaultValue = {
//   //         p: 3,
//   //         mode: 0
//   //       };

//   //       const { status } = response;
//   //       switch (status) {
//   //         case 200:
//   //           localStorage.setItem("login", "true");
//   //           localStorage.setItem("mode", defaultValue.mode.toString());
//   //           let redirectPath;
//   //           switch (defaultValue.p) {
//   //             case 1:
//   //               redirectPath = "/";
//   //               break;
//   //             case 2:
//   //               redirectPath = "/ManageEmployees";
//   //               break;
//   //             case 3:
//   //               redirectPath = "/CreateNotification";
//   //               break;
//   //             case 4:
//   //               redirectPath = "/SendNotifications";
//   //               break;
//   //             case 5:
//   //               redirectPath = "/Broadcast";
//   //               break;
//   //             default:
//   //               redirectPath = "/";
//   //               break;
//   //           }
//   //           setTimeout(()=>{
//   //             router.reload()
//   //           },1000)
//   //           router.push(redirectPath);
//   //           break;
//   //         case 201:
//   //           setMfa(true);
//   //           break;
//   //         case 225:
//   //           setSnackbar("error", User is inactive);
//   //           break;
//   //         default:
//   //           setSnackbar("error", Internal Server Error);
//   //           break;
//   //       }
//   //     } catch (error) {
//   //       const { status } = error.response;
//   //       switch (status) {
//   //         case 401:
//   //           setSnackbar("error", Wrong credentials);
//   //           break;
//   //         case 404:
//   //           setSnackbar("error", User not found);
//   //           break;
//   //         default:
//   //           setSnackbar("error", Internal Server Error);
//   //           break;
//   //       }
//   //     }
//   //   },
//   // });

//   const handleClickShowPassword = () => {
//     setValues({ ...values, showPassword: !values.showPassword });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const allDigitsPresent = inputValues.every((value) => value !== "");
//     if (allDigitsPresent) {
//       const otp = inputValues.join("");
//       const params = { otp: otp };

//       const response = await axios.post("/api/handleMfa", values, { params });
//       if (response.status === 200) {
//         setSnackbar("success", "Verified");
//         localStorage.setItem("login", "true");
//         router.reload();
//       } else {
//         setSnackbar("error", "Wrong Otp");
//       }
//     } else {
//       setSnackbar("error", "Please enter valid Otp");
//     }
//   };
//   return (
//     <>
//       <Grid
//         container
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <Grid item xs={12} sm={8} md={6} lg={3}>
//           <Card sx={{ zIndex: 1 }}>
//             {!mfa ? (
//               <CardContent>
//                 <Box
//                   sx={{
//                     mb: 8,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Link href="/">
//                     <a>
//                       <Image
//                         src="/images/favicon.png"
//                         alt="company logo"
//                         width={100}
//                         height={100}
//                       />
//                     </a>
//                   </Link>
//                 </Box>
//                 <Box
//                   sx={{
//                     mb: 8,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Typography
//                     variant="h4"
//                     sx={{ fontWeight: 600, marginBottom: 1.5 }}
//                   >
//                     Welcome to Spindle
//                   </Typography>
//                 </Box>
//                 <form onSubmit={(e) => e.preventDefault()}>
//                   <Grid
//                     container
//                     spacing={4}
//                     sx={{
//                       mb: 2,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Grid item xs={11}>
//                       <TextField
//                         autoComplete="email"
//                         fullWidth
//                         id="email"
//                         sx={{
//                           marginBottom: 4,
//                         }}
//                         type="text"
//                         placeholder="Email"
//                         {...formik.getFieldProps("email")}
//                         error={
//                           formik.touched.email && Boolean(formik.errors.email)
//                         }
//                         helperText={formik.touched.email && formik.errors.email}
//                       />
//                     </Grid>
//                     <Grid item xs={11}>
//                       <TextField
//                         autoComplete="current-password"
//                         fullWidth
//                         placeholder="Password"
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") formik.handleSubmit();
//                         }}
//                         id="auth-login-password"
//                         type={values.showPassword ? "text" : "password"}
//                         {...formik.getFieldProps("password")}
//                         error={
//                           formik.touched.password &&
//                           Boolean(formik.errors.password)
//                         }
//                         helperText={
//                           formik.touched.password && formik.errors.password
//                         }
//                         InputProps={{
//                           endAdornment: (
//                             <Box></Box>
//                             // <InputAdornment position="end">
//                             //   <IconButton
//                             //     onClick={handleClickShowPassword}
//                             //     onMouseDown={handleMouseDownPassword}
//                             //     aria-label="toggle password visibility"
//                             //     edge="end"
//                             //   >
//                             //     {values.showPassword ? (
//                             //       <EyeOutline />
//                             //     ) : (
//                             //       <EyeOffOutline />
//                             //     )}
//                             //   </IconButton>
//                             // </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </Grid>
//                   </Grid>

//                   <Box
//                     sx={{
//                       mb: 4,
//                       marginLeft: "5%",
//                       display: "flex",
//                       alignItems: "center",
//                       flexWrap: "wrap",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <FormControlLabel
//                       control={<Checkbox />}
//                       label="Remember Me"
//                     />
//                     <Box sx={{ marginRight: 4 }}>
//                       <Link passHref href="/password-reset">
//                         <LinkStyled>Forgot Password?</LinkStyled>
//                       </Link>
//                     </Box>
//                   </Box>
//                   <Button
//                     fullWidth
//                     size="large"
//                     variant="contained"
//                     sx={{ marginBottom: 7 }}
//                     onClick={formik.handleSubmit}
//                   >
//                     Login
//                   </Button>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       flexWrap: "wrap",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Typography variant="body2" sx={{ marginRight: 2 }}>
//                       New on our platform?
//                     </Typography>
//                     <Typography variant="body2">
//                       <Link passHref href="/register_user">
//                         <LinkStyled>Request an account</LinkStyled>
//                       </Link>
//                     </Typography>
//                   </Box>
//                 </form>
//               </CardContent>
//             ) : (
//               <CardContent>
//                 <Grid item xs={12} sm={12} md={12} lg={12}></Grid>
//                 <Box
//                   sx={{
//                     mb: 8,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Link href="/">
//                     <a>
//                       <Image
//                         src="/images/favicon.png"
//                         alt="company logo"
//                         width={100}
//                         height={100}
//                       />
//                     </a>
//                   </Link>
//                 </Box>
//                 <Box
//                   sx={{
//                     mb: 8,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Typography
//                     variant="h4"
//                     sx={{ fontWeight: 600, marginBottom: 1.5 }}
//                   >
//                     Enter your Otp
//                   </Typography>
//                 </Box>

//                 <OtpInput
//                   inputValues={inputValues}
//                   setInputValues={setInputValues}
//                 />

//                 <Button
//                   fullWidth
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSubmit}
//                   sx={{ mt: 4 }}
//                 >
//                   Verify
//                 </Button>
//                 <Box
//                   sx={{
//                     mt: 4,
//                     display: "flex",
//                     alignItems: "center",
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {!!!otpTimer ? (
//                     <>
//                       <Typography variant="body2" sx={{ marginRight: 2 }}>
//                         Click here to
//                       </Typography>
//                       <Typography variant="body2" onClick={resendOtp}>
//                         <Link passHref href="#resend">
//                           <LinkStyled>request </LinkStyled>
//                         </Link>
//                       </Typography>

//                       <Typography variant="body2" sx={{ marginRight: 2 }}>
//                         &nbsp; a new otp code
//                       </Typography>
//                     </>
//                   ) : (
//                     <Typography variant="body2" sx={{ textAlign: "center" }}>
//                       Resend OTP in {otpTimer} seconds
//                     </Typography>
//                   )}
//                 </Box>
//               </CardContent>
//             )}
//           </Card>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default LoginPage;
const LoginPage=()=>{

}
export default LoginPage