import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField, Typography } from "@mui/material";
import { deleteParking } from "../../services/firebase";

const ParkingRemoveDialog = ({
    openRemove,
    setOpenRemove,
    parking,
}) => {

    const handleRemove = () => {
        console.log(parking.number);
        deleteParking(parking.id);
        setOpenRemove(false);
    }

    return (
        <>
        <Dialog
        open={openRemove}
        onClose={() => setOpenRemove(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de terminar la reserva?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRemove(false)}>No</Button>
          <Button onClick={handleRemove} autoFocus>
            Si
          </Button>
        </DialogActions>
      </Dialog>
        </>
    );
};

export default ParkingRemoveDialog;