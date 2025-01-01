import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const PrivacyPage = () => {
const TermsData = [
    {Title:"Privacy of our clinic.",description:[`Integrative Behavioral Health and Medicine, Inc (“KIH,” “we,” “us,” or “our”) respects and is committed to protecting your privacy through compliance with this Privacy Policy. This Privacy Policy describes how KIH collects, uses, and shares information about you that we obtain through our website having URL https://www.kairosintegrativehealth.com.`,`The practices described in this Privacy Policy are not applied to protected health information (“PHI”). This Privacy Policy shall be read along with the Terms & Conditions of this Website in order to get a better understanding. Please read this policy carefully. By accessing or using our Website, you agree to this Privacy Policy.`]},
    {Title:"INFORMATION YOU PROVIDE TO US",description:[
      `We collect the information you provide directly to us through our Website.`,`You choose to share your personal information with us to use our Website, request information, sign up for newsletters, make inquiries, participate in surveys or promotions, or otherwise interact with us.`,`Personal Information includes first and last name, e-mail address, home address, telephone number, payment card information, or date of birth, unless de-identified or encrypted.`,`Information collected is used to identify an individual, ensuring personalized and effective service delivery.`]},
    {Title:"INFORMATION WE COLLECT",description:[
     `Details of visits to our Website, including traffic data, location data, logs, and other communication data, as well as information about your computer and internet connection.`,`Automatic data collection technologies include Cookies (small text files saved on your device for login and functionality) and Web Beacons (tiny graphic files for anonymous, non-personal usage data).`,`These tools help us customize the Website, enhance usability, and deliver a better user experience by analyzing traffic and preferences.`]},
    {Title:"HOW IS YOUR INFORMATION USED",description:[
     `Deliver requested services, improve customer service, and personalize content, advertising, and communication based on your preferences.`,`Send promotional or critical system-related emails (with options to unsubscribe or opt out where applicable) and notify users about changes or developments to our Website or services.`,`Analyze data for market research, improve business operations, and offer relevant products or services while safeguarding your personal information from unauthorized use.`]},
  ]

  return (
    <>
      <Box sx={{ mt: 5, mb: 2,textAlign:"center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
        Privacy Policy
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
    
        <List>
          {TermsData.map((term, index) => (
            <ListItem key={index} sx={{ mb: 2 }}>
              <ListItemText
                primary={
                  <>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'black' }}>
                      {index + 1}. {term.Title}
                    </Typography>
                    <List>
                      {term.description.map((point, i) => (
                        <ListItem key={i} sx={{ display: 'list-item', pl: 3 }}>
                          <Typography variant="body2" sx={{ color: 'black' }}>
                           {i+1}. {point}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default PrivacyPage;