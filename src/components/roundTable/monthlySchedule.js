import { Box, Typography,List,ListItem,ListItemText,Link  } from '@mui/material';

const MonthlySchedulePage=()=>{
    const MonthData = [
        { monthName: 'February',description: `Welcome to Kairos Integrative Health / Depression (Seasonal Affective
Disorder) - (Discussion on risk factors, symptoms, treatments, and how to
discuss concerns with others).` },
        { monthName: 'March', description: `Welcome to Kairos Integrative Health / Anxiety (Generalized Anxiety
Disorder, Social Phobia, etc.) - (risk factors, symptoms, treatment, and
how to discuss concerns with others).` },
        { monthName: 'April', description: `Mental Health in the family: Genetics and cross generational experiences.` },
        { monthName: 'May', description: `Obsessive Compulsive Disorder (risk factors, symptoms, treatment, and
how to discuss concerns with others)` },
        { monthName: 'June', description: `You asked for it! (In June we will discuss a topic requested by
participants.)` },
        { monthName: 'July', description: `Nutritional Workshop (Stay tuned for details!)` },
        { monthName: 'August', description: 'Stress and Time Management (All ages welcome!)' },
        { monthName: 'September', description: 'Neurotransmitters: and what can I expect from my medication?' },
        { monthName: 'October', description: `Bipolar Disorder - (risk factors, symptoms, treatment, and how to discuss
concerns with others)` },
        { monthName: 'November', description: 'Fitness Workshop (Stay tuned for details!)' },
        { monthName: 'December', description: `You asked for it! (In December we will discuss a topic requested by
participants.)` },
      ];
return (
    <>
    
 



      <Box >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
        Resilience Roundtables are held on the first Thursday of each month.
        </Typography>
      </Box>
      
  
     
      <Box
      sx={{
        width: '100%',
        margin: 'auto',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: '#f5f5f5',
      }}
    >
       <Box >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
        2025 Calendar
        </Typography>
      </Box>
      <List>
        {MonthData.map((cause, index) => (
          <ListItem key={index} sx={{ mb: 2 }}>
            <ListItemText
              primary={
                <><Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'black' }}>
                            {index + 1}. {cause.monthName}
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


</>);
}
export default MonthlySchedulePage;