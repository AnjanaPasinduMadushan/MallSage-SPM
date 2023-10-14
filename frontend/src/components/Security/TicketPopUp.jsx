import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import ReactToPrint from 'react-to-print';
import PrintComponent from '../Ticket/Print';
import { useRef } from 'react';
import { formatDate } from "../../util/formatDate";

export default function AlertDialog({id , available}) {
  const [open, setOpen] = React.useState(false);
 
  const [duration, setDuration] = React.useState('');
  const [totalAmount, setTotalAmount] = React.useState('');
  const[Slot, setSlot] = React.useState('');
  const handleClickOpen = async (e) => {
    e.preventDefault();
    setOpen(true);
    try{
      const res = await axios.patch(`http://localhost:5050/slot/end/${id}`);
      const data = await res.data;
      console.log(data);
      console.log(data.Slot);
      setDuration(data.duration);
      setTotalAmount(data.totalAmount);
      setSlot(data.Slot);       
    }catch(error){
      console.log(error);
    }

  };
  const printRef = useRef();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen} disabled={available}>
        End
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ticket Print"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <TextField
          disabled
          id="outlined-disabled"
          value={"Slot Number - " + Slot.slotNumber}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <TextField
          disabled
          id="outlined-disabled"
          value={"Vehical Number - " + Slot.vehicleNumber}
          style={{ marginBottom: '10px', width: '100%' }}
        />
          <TextField
          disabled
          id="outlined-disabled"
          value={"Duration - s" + duration}
          style={{ marginBottom: '10px', width: '100%' }}
        />
         <TextField
          disabled
          id="outlined-disabled"
          value={"Amount - Rs:" + totalAmount}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        
        <TextField
          disabled
          id="outlined-disabled"
          value={`Start Time - ${formatDate(Slot.startTime,"HH:MM:ss")} `  }
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <TextField
          disabled
          id="outlined-disabled"
          value={`Start Time - ${formatDate(Slot.endTime,"HH:MM:ss")} `}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <ReactToPrint
            trigger={() => <Button>Print</Button>}
            content={() => printRef.current}
          />
          <Button onClick={handleClose} autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ display: 'none' }}>
        <PrintComponent ref={printRef} Slot={Slot} duration={duration} totalAmount={totalAmount} />
      </div>
    </div>
  );
}