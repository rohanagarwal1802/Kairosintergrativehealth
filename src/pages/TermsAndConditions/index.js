import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const TermsAndConditionsPage = () => {
  const TermsData = [
    {
      Title: "General Use",
      description: [
        "Agreement to Terms: By accessing this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, along with our Privacy Policy.",
        "Purpose: The content on this website is for general informational and educational purposes only. It is not intended to substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for personal medical concerns.",
        "Doctor-Patient Relationship: Accessing or using this website does not establish a doctor-patient relationship between you and Kairos Integrative Health or any of its practitioners.",
      ],
    },
    {
      Title: "Information and Liability",
      description: [
        "Accuracy of Information: While we strive to provide accurate and up-to-date content, KIH makes no guarantees regarding the accuracy, completeness, or reliability of the information presented on this website.",
        "Disclaimer of Liability: We disclaim all liability for any reliance placed on the content of this website. Decisions regarding your health should always be made in consultation with a licensed healthcare professional.",
      ],
    },
    {
      Title: "User Contributions",
      description: [
        "Content Submission: When you submit or post content on this website, you affirm that you have the necessary rights to share such content and that it does not violate the rights of any third party.",
        "License to Use Content: By submitting content, you grant KIH a perpetual, royalty-free, non-exclusive license to use, reproduce, modify, and distribute your content for educational, promotional, or other purposes.",
        "Privacy in Contributions: Avoid including personal or sensitive information in your submissions. KIH is not responsible for any disclosure of personal information you choose to share publicly.",
        "Moderation: KIH reserves the right to remove, edit, or decline to post any user contributions at our sole discretion.",
      ],
    },
    {
      Title: "Prohibited Activities",
      description: [
        "Misuse of Website: You agree not to engage in any activity that could harm, disrupt, or impair the website’s functionality, including introducing viruses or malicious software, attempting unauthorized access, or impersonating others.",
        "Commercial Use: Unauthorized commercial use of the content or services provided on this website is strictly prohibited.",
        "Termination of Access: KIH may restrict or terminate your access to the website if you violate these terms.",
      ],
    },
    {
      Title: "Intellectual Property",
      description: [
        "Ownership of Content: All materials on this website, including text, graphics, logos, and other content, are owned by KIH or its licensors and are protected by copyright and trademark laws.",
        "License for Personal Use: You are granted a limited, revocable, non-transferable license to access and use the website for personal, non-commercial purposes. Any other use requires prior written consent from KIH.",
      ],
    },
    {
      Title: "Communication",
      description: [
        "Electronic Communication: Communication with KIH through this website, including forms and emails, does not establish a doctor-patient relationship.",
        "Confidentiality: While KIH takes reasonable measures to protect the confidentiality of communications, we cannot guarantee absolute security.",
      ],
    },
    {
      Title: "Disclaimer",
      description: [
        "No Guarantees: KIH does not guarantee specific outcomes or results from the use of this website or its content. The information is provided “as is” without warranties of any kind.",
        "Individual Success: Any outcomes from the use of KIH resources depend on individual circumstances, effort, and factors beyond our control.",
      ],
    },
    {
      Title: "Change of Terms",
      description: [
        "Updates to Terms: KIH reserves the right to update or modify these Terms and Conditions at any time without prior notice. Continued use of the website constitutes acceptance of the revised terms.",
      ],
    },
  ];
 return (
    <>
      <Box sx={{ mt: 5, mb: 2,textAlign:"center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
        Terms & Conditions
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
        <Box>
  <Typography
    variant="h6"
    sx={{ fontWeight: "bold", color: "black", alignItems: "center", mb: 2 }}
  >
    Terms and Conditions of our Clinic
  </Typography>

</Box>
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

export default TermsAndConditionsPage;
 
