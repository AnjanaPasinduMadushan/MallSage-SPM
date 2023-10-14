import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

// eslint-disable-next-line react/prop-types
export default function PopUp({Id , available}) {

  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    vehicleNumber: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  }



const handleClose = async () => {
  if (!input.vehicleNumber.trim()) {
    toast.error('Vehicle Number is required.');
    return;
  }
  try {
    const res = await axios.patch(`http://localhost:5050/slot/start/${Id}`, {
      vehicleNumber: input.vehicleNumber,
    });
    const data = await res.data;
    console.log(data);
    setOpen(false);
    location.reload();
  } catch (err) {
    console.log(err);
  }
};

// ...


// //  const isAvailable = ()=>{
// //   if(available === "true"){
// //     return false;
// //  }
//  return true
// }

  return (
    <>
      <Tooltip title="To book a paking slot">
        <Button variant="contained" onClick={handleClickOpen} disabled={!available} >
          Book
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Slot Booking</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="vehicleNumber"
            label="Vehical Number"
            type="String"
            fullWidth
            value={input.vehicleNumber}
            onChange={handleChange}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose()}>Booking</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer/>
    </>
  );

}