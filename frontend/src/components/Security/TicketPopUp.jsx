import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import TextField from '@mui/material/TextField';



export default function AlertDialog({id}) {
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
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
          label="Slot Number"
          value={Slot.slotNumber}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Vehical Number"
          value={Slot.vehicleNumber}
          style={{ marginBottom: '10px', width: '100%' }}
        />
          <TextField
          disabled
          id="outlined-disabled"
          label="Duration"
          value={duration}
          style={{ marginBottom: '10px', width: '100%' }}
        />
         <TextField
          disabled
          id="outlined-disabled"
          label="Amount"
          value={totalAmount}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        
        <TextField
          disabled
          id="outlined-disabled"
          label="Disabled"
          value={Slot.startTime}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Disabled"
          value={Slot.endTime}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>
            print({
              printable: Slot,
              properties: [
                { field: "slotNumber", displayName: "Paking Slot" },
                {field: "vehicleNumber", displayName: "Vehical Name"},
                { field: "duration", displayName: "Duration" },
                { field: "totalAmount", displayName: "Total Amount" },
                { field: "startTime", displayName: "Start Time" },
                { field: "endTime", displayName: "End Time" },
              ],
              type: "json",
            })
          }>Print</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}