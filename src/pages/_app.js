import "@/styles/globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginPage from "./login";
import axios from "axios";
import Loader from "@/components/Loader";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [pageDisplay, setPageDisplay] = useState(""); // Tracks page state
  const [isAuthChecked, setIsAuthChecked] = useState(false); // Tracks auth status
  const [userDetails, setUserDetails] = useState(null); // Stores user data
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const checkServerStatus = async () => {
      setLoading(true); // Start loading
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Helper function for delay
    
      try {
        const res = await axios.get("/api/cookie");
        console.log("res.data", res.data);
    
        if (res.data) {
          setUserDetails(res.data); // Set user details
          setPageDisplay("app"); // Show the app layout
          if (res.data?.role === "admin") {
            router.push("/Admin"); // Redirect to admin panel
          } else {
            router.push("/");
          }
        } else {
          setPageDisplay("app"); // Show login page
          localStorage.setItem("login", "false");
        }
      } catch (error) {
        setPageDisplay("app"); // On error, show login page
        localStorage.setItem("login", "false");
      } finally {
        await delay(3000); // Ensure a 5-second delay
        setIsAuthChecked(true); // Mark auth check as complete
        setLoading(false); // Stop loading
      }
    };
    

    checkServerStatus(); // Run the check on page load
  }, [router.pathname]); // Dependency ensures no redundant checks

  // Default layout if not defined in the component
  const getLayout =
    Component.getLayout ||
    ((page) => <Layout userDetails={userDetails}>{page}</Layout>);

  // Conditional rendering based on auth status
  const getComponent = () => {
    if (!isAuthChecked || loading) return <Loader />; // Show loader during auth check
    if (pageDisplay === "login") return <LoginPage />; // Show login page
    return getLayout(<Component {...pageProps} userDetails={userDetails} />); // Show main app
  };

  return <>{getComponent()}</>;
}
