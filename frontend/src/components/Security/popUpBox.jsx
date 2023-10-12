import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Tooltip } from '@mui/material';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function PopUp({Id , available}) {

  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    vNo: "",
  });
  let intoNumber;
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

  // eslint-disable-next-line no-unused-vars
  const handleClose = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.patch(`http://localhost:5050/slot/updateSlot/${Id}`, {
        vehicleNumber: input.vNo
      });
      const data = await res.data;
      console.log(data);
      setOpen(false);
      // location.reload();
    } catch (err) {
      console.log(err);
    }
  }

 const isAvailable = ()=>{
  if(available === "true"){
    return false;
 }
 return true
}

  return (
    <>
      <Tooltip title="To book a paking slot">
        <Button variant="outlined" onClick={handleClickOpen} disabled={isAvailable && isAvailable === true} >
          Book
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Slot Booking</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="vNo"
            name="vNo"
            label="Vehical Number"
            type="String"
            fullWidth
            value={input.vNo}
            onChange={handleChange}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Booking</Button>
        </DialogActions>
      </Dialog>
    </>
  );

}