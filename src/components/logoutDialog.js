

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";



const LogOutDialog = ({ setOpen,open ,handleLogout}) => {
  


  return (


      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Logout Confirmation</DialogTitle><DialogContent>Are you sure you want to log out?</DialogContent><DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                  No
              </Button>
              <Button
                  onClick={async () => {
                      await handleLogout( );
                      setOpen(false)
                  } }
                  color="primary"
              >
                  Sure
              </Button>
          </DialogActions>
      </Dialog>

     
  );
};

export default LogOutDialog;