import { Box, Typography,List,ListItem,ListItemText,Link  } from '@mui/material';

const MonthlySchedulePage=()=>{
    const MonthData = [
        { monthName: 'February',title:"Feeling Low? Let’s Get You Back to Good Vibes Only",description: `Focus: Major Depressive Disorder, Dysthymia, & Seasonal Affective Disorder
o	Why You Should Join:  Join to gain knowledge on risk factors, preventative factors, symptoms, warning signs, treatments, and how to discuss concerns with your provider. Great for yourself or for better understanding a loved one!` },
        { monthName: 'March',title:"Worrying Too Much? It’s Time to Stop Doomscrolling!", description: `Focus: Generalized Anxiety Disorder, Social Phobia & All things Worry
o	Why You Should Join: Caught in the endless “what if” scroll? Let’s hit pause and talk about risk factors, preventative factors, symptoms, warning signs, treatments, and how to discuss concerns with your provider. Great for yourself or for better understanding a loved one! Great for yourself or for better understanding your teen!` },
        { monthName: 'April',title:"Mental Health in the family. Different jeans, Same genes - Personal style vs. Family ties.", description: `Focus: Genetics in mental health disorders and cross generational experiences/lingo.
•	Why You Should Join: It may be hereditary but it doesn’t determine your future. Join for a discussion around nature vs. nurture in specific mental health disorders and what you can do to pursue the highest quality of life for you and your loved ones. ` },
        { monthName: 'May',title:"Let’s Talk OCD - And No, You Don’t Have to Rearrange the Furniture", description: `Focus: All things Obsessive-Compulsive Disorder
•	Why You Should Join: Join to gain knowledge on risk factors, preventative factors, symptoms, warning signs, treatments, and how to discuss concerns with your provider. Great for yourself or for better understanding a loved one!` },
        { monthName: 'June',title:"You Asked For It! - “We listen and we don’t judge.”", description: `Focus: Topic picked by previous Resillience Roundtable Attendees
•	Why You Should Join: More to come!
` },
        { monthName: 'July',title:"Brain Food: Because Your Mind Deserves More Than Just Leftovers and Takeout", description: `Focus: Nutrition & Mental Health
•	Why You Should Join: Nutrition can make or break your mood. Let’s find out what really fuels the brain - besides your favorite comfort foods (which is okay to eat… in moderation).` },
        { monthName: 'August',title:"Stress Less, Live More: Practical Tips for Managing Time and Staying Sane", description: `Focus: Stress Reduction & Time Management
•	Why You Should Join: You’re not a superhero, but let’s figure out how to juggle work, family, and life without needing a cape.
` },
        { monthName: 'September',title:"Neurotransmitters, Medications, and You - Get the Facts, Feel the Difference!", description: `Focus: Neurotransmitters, Medications, and Mental Health
•	Why You Should Join: Curious about what meds are really doing to your brain? Lets talk!` },
        { monthName: 'October',title:"Bipolar Disorder: Riding the Emotional Rollercoaster Without Losing Your Lunch", description: `Focus: All things Bipolar Disorder
•	Why You Should Join: Highs, lows, and everything in between. Let’s talk about how to manage bipolar disorder without feeling like you’re on a never-ending ride at the fair. Join to gain education on risk factors, preventative factors, symptoms, warning signs, treatments, and how to discuss concerns with your provider. Great for yourself or for better understanding a loved one!` },
        { monthName: 'November',title:"Fitness for Mental Health: Move Your Body, Calm Your Mind", description: `Focus: Physical Fitness & Mental Well-being
•	Why You Should Join: Break a sweat and boost your mood. Let’s talk simple fitness for big mental health benefits.` },
        { monthName: 'December',title:"You Asked, We Delivered: “We listen and we don’t judge” - No Filters Needed!", description: `Focus: Topic picked by previous Resillience Roundtable Attendees
•	Why You Should Join: More to come!` },
      ];
return (
    <>
    
 



     
      
  
     
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
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" ,alignItems:"center",textAlign:"center"}}>
        2025 Calendar
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" ,alignItems:"center",textAlign:"center"}}>
        The Resilience Roundtables is held on the first Thursday of each month.
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
                        
                        
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'black', ml:"2%"}}>
                            {cause.title}
                        </Typography>
                        
                        

          </>
              }
              secondary={
                <Typography variant="body2" sx={{ color: 'black', whiteSpace: 'pre-line',ml:"2%"}}>
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