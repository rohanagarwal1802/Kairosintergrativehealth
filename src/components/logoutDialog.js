// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react"; // ** Add useState import

// ** MUI Imports
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Popover from "@mui/material/Popover"; // ** Add Popover import
import Divider from "@mui/material/Divider"; // ** Add Popover import
import useAuthStore from "src/pages/store/session";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";



const LogOutDialog = ({ item, hidden, setOpen, pin, open }) => {
  const { setIsLoggedIn, setIsAuthChecked } = useAuthStore();
  


  return (


      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Logout Confirmation</DialogTitle><DialogContent>Are you sure you want to log out?</DialogContent><DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                  No
              </Button>
              <Button
                  onClick={async () => {
                      await handleLogout(
                          setIsLoggedIn,
                          setIsAuthChecked,
                          setOpenDialog
                      );
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