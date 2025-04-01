import "@/styles/globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Layout from "@/components/layout";
import CustomSnackbar from "./utils/customSnackbar";
import useCustomSnackbarStore from "./utils/useCustomSnackbarStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginPage from "./login";
import axios from "axios";
import Loader from "@/components/Loader";
import useUserStore from "@/components/useUserStore";
import MakePassword from "@/components/makePassword";
import LocationSelectionDialog from "@/components/Location/locationPopup";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const {pageDisplay, setPageDisplay,login,setLogin,toResetPassword} = useUserStore(); // Tracks page state
  const [isAuthChecked, setIsAuthChecked] = useState(false); // Tracks auth status
  const [userDetails, setUserDetails] = useState(null); // Stores user data
  const [loading,setLoading]=useState(true)
  const { loginLoader, setLoginLoader,preferedLocation ,setPreferedLocation} = useUserStore();
const url=router.asPath;
const { snackbarOpen, alertType, alertMessage, closeSnackbar,setSnackbar } =
useCustomSnackbarStore();

const [openDialog, setOpenDialog] = useState(false);

useEffect(() => {
  // Check if a location is already stored
  // const savedLocation = localStorage.getItem("preferredLocation");

  if (!preferedLocation) {
    setTimeout(() => {
      setOpenDialog(true); // Open dialog after 3 seconds
    }, 5000);
  }
  //  else {
  //   setPreferedLocation(savedLocation);
  // }
}, []);



// useEffect(() => {
//   // Check if 'login' exists in localStorage and is "true"
//   if (localStorage.getItem("login") === "true") {
//     setLogin(true);
//   }
// }, []);
// useEffect(()=>{
//   if(login===true)
//   {
    
//     router.push(pageDisplay)
//   }
// },[login])

  const checkPageDisplay=async ()=>{
    try{
setLoading(true)
const response=await axios.post('/api/verifyToken',url)
if(response.data.hasVerified && response.data.token)
{
  setUserDetails(response.data.token)
  setPageDisplay("makePassword")
}
else
{
  setPageDisplay("login")
}
setIsAuthChecked(true); // Mark auth check as complete
setLoading(false); // Stop loading
    }
    catch(error)
    {
      console.log(error)
    }
   
  }

  useEffect(() => {
    const checkServerStatus = async () => {
      setLoading(true); // Start loading
   
    
      try {
        const res = await axios.get("/api/cookie", { withCredentials: true });
        console.log("res.data", res);
    
        if (res.data && res.status==200) {
          setUserDetails(res.data); // Set user details
         
          // setLogin(true);
          console.log("pageDisplay ==>",pageDisplay)
          console.log("login",login,localStorage.getItem("login"))
         // Show the app layout
         if(login==false || (localStorage.getItem("login")===null || localStorage.getItem("login")===undefined || localStorage.getItem("login")==="false" || localStorage.getItem("login")===""))
          {
            localStorage.setItem("login", "true");
          if (res.data?.role === "admin") {
            setPageDisplay("Admin"); 
            console.log(login)
            
               await router.push("/Admin")
              
          //await  router.push("/Admin"); // Redirect to admin panel
          } else {
            setPageDisplay("userAppointments"); 
               await router.push("/userAppointments")
              
          // await  router.push("/userAppointments");
          }
          setSnackbar('success','Logged in Successfully')
          setLogin(true);
          setLoginLoader(false)
        }
        
        } else {
          setPageDisplay("app"); // Show login page
          if(login===true)
          {
          localStorage.setItem("login", "false");
          setLogin(false)
          }
          let pathname=router.pathname
          router.push(pathname)
        }
      } catch (error) {
        setPageDisplay("app"); // On error, show login page
        if(login===true)
          {
          localStorage.setItem("login", "false");
          setLogin(false)
          }
      } finally {
        setIsAuthChecked(true); // Mark auth check as complete
        setLoading(false); // Stop loading
       
      }
    };
    
    if(url.includes("/?verify="))
      {
        checkPageDisplay()
      }
      else
      {
    checkServerStatus();
       } // Run the check on page load
  }, [router.pathname,toResetPassword]); // Dependency ensures no redundant checks

  // Default layout if not defined in the component
  const getLayout =
    Component.getLayout ||
    ((page) => <Layout userDetails={userDetails}>{page}</Layout>);

  // Conditional rendering based on auth status
  const getComponent = () => {
    if (!isAuthChecked || loading) return <Loader />; // Show loader during auth check
    if(pageDisplay==="makePassword") return <MakePassword token={userDetails}/>;
    if (pageDisplay === "login") return <LoginPage />; // Show login page
    return getLayout(<Component {...pageProps} userDetails={userDetails} />); // Show main app
  };

  return <>{getComponent()}
  <CustomSnackbar
                  open={snackbarOpen}
                  onClose={closeSnackbar}
                  alertType={alertType}
                  message={alertMessage}
                />
                {(router.pathname!=='/login' && isAuthChecked && userDetails?.role!=='admin') &&
                 <LocationSelectionDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        // handleSubmit={handleLocationSelect}
      />
                }
  </>;
}
