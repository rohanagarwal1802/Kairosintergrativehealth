import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // MUI icon for the close button

function FullScreenDialog() {
  const [open, setOpen] = useState(false);

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
      <Button variant="outlined" onClick={handleOpen}>
        Open Full Screen Dialog
      </Button>

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
          Scanner
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
          {/* Replace with actual scanner component */}
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
            <Typography variant="h6">Scanner will be here</Typography>
          </div>

          {/* Link below the scanner */}
          <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
            <Button variant="text">Click here for more information</Button>
          </a>
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
