import GoogleMap from "../../components/Contact/googleMap";
import { Box, Typography,List,ListItem,ListItemText,Link  } from '@mui/material';
import Image from "next/image";
import ContactForm from "@/components/Contact/contactForm";
import useUserStore from "@/components/useUserStore";
import AlabamaCauses from "@/components/Location/alabamaHelplineCauses";
import NorthCarolinaCauses from "@/components/Location/northCarolinaCauses";
import { useEffect,useState } from "react";
const HelpLinesPage=()=>{
    const { preferedLocation, setPreferedLocation } = useUserStore();
    const [locationHelplines,setLocationHelplines]=useState([]);
useEffect(()=>{
  if(preferedLocation==='Alabama')
  {
    setLocationHelplines(AlabamaCauses())
  }
  else if(preferedLocation==='North Carolina'
  )
  setLocationHelplines(NorthCarolinaCauses())
},[preferedLocation])
return (
    <>
    
    
    <Box
  sx={{
    backgroundColor: `#C8AF8F`,
    backgroundSize: 'cover', // Ensures the image covers the entire box
    backgroundPosition: 'top', // Focuses on the upper part of the image
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4, // Adds padding around the content
    borderRadius: 2, // Optional: Adds rounded corners for a softer look
    height: 'auto', // Dynamically adjusts height to fit content
    width: '100%', // Ensures it spans the full width
  }}
>
    
    {/* <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}> */}

  <Box sx={{mt:"1%"}}>
    <Image
      src="/helpline.jpg"
      alt="Mental Well-being"
      width={300} // Adjust as needed
      height={400}
      style={{ borderRadius: "8px",mt:"1%" }} // Optional: Add rounded corners
    />  
  </Box>

 
{/* </Box> */}


      <Box >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
        Helplines
        </Typography>
      </Box>
      
      <Box >
     
      <Box
      sx={{
        width: '100%',
        margin: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: '#f5f5f5',
        mb:4
      }}
    >
     
      <List>

        {locationHelplines.map((cause, index) => (
          <ListItem key={index} sx={{ mb: 2 }}>
            <ListItemText
              primary={
                <><Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'black' }}>
                            {index + 1}. {cause.title}
                        </Typography>
                        
                        
                        <Typography 
  variant="subtitle2" 
  fontWeight="bold" 
  sx={{ color: 'black', wordBreak: 'break-word' }}
>
  Website:{" "}
  <Link 
    href={cause.website} 
    target="_blank" 
    rel="noopener noreferrer" 
    sx={{ wordBreak: 'break-word' }}
  >
    {cause.website}
  </Link>
</Typography>


                            
                            </>
              }
              secondary={
                <Typography variant="body2" sx={{ color: 'gray', whiteSpace: 'pre-line' }}>
                {cause.description}
              </Typography>
              
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
        </Box>


        </Box>
</>);
}
export default HelpLinesPage;