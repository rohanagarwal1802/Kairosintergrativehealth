import React, { useState ,useEffect} from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // MUI icon for the close button

function FullScreenDialog({open,setOpen,scanner,type}) {
  const [link,setLink]=useState(null)
useEffect(()=>{
if(type==="guest")
{
  setLink("https://connect.intuit.com/pay/kihinitialvisit/scs-v1-e4cf29bc76354f91ae9417b57a2ef0ef305c1535e71842d289f92e2fee06c150db890200c7bf4e568defa7de77e6224e?locale=EN_US")
}
else if(type==="member")
{
  setLink("https://connect.intuit.com/pay/kihinitialvisit/scs-v1-aeb9271136cc42f49593de34f2adae5edeb7add46ebf4919aba811e1dc96cd0155d1a2094c474ff2bf6c9cb17b6b1853?locale=EN_US")
}
},[type])

  // Function to open the dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleOpen}>
        Open Full Screen Dialog
      </Button> */}

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        PaperProps={{
          sx: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
          },
        }}
      >
        <DialogTitle>
          {type}
          {/* Close button on the top-right */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
  <div
    style={{
      width: '100%',
      height: '300px',
      border: '2px dashed black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '20px',
    }}
  >
    {scanner ? (
      <img
        src={scanner}
        alt="Scanner"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    ) : (
      <Typography variant="h6">Scanner will be here</Typography>
    )}
  </div>

  {/* OR in center */}
  <div style={{ textAlign: 'center', margin: '10px 0' }}>
    <Typography variant="body1">OR</Typography>
  </div>

  <div style={{ textAlign: 'center' }}>
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Button variant="text">Pay via Quickbooks link</Button>
    </a>
  </div>
</DialogContent>


        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FullScreenDialog;
