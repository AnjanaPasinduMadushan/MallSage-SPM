import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function FormDialog({ locationId, availability, onReservationComplete, currentNoReserved }) {

  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    no: 0
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
    intoNumber = parseInt(input.no)
    console.log(intoNumber);
    try {
      const res = await axios.patch(`http://localhost:5000/restingLocation/addReserved/${locationId}`, {
        Reserved: [{ no: intoNumber }]
      });
      const data = await res.data;
      console.log(data);
      onReservationComplete(data);
      setOpen(false);
      // location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const isChecking = () => {
    const checkingResult = availability === currentNoReserved;
    return checkingResult;
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} disabled={!isChecking}>
        Reserve
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Reserve</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="no"
            name="no"
            label="No of Shoppers"
            type="number"
            fullWidth
            value={input.no}
            onChange={handleChange}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: 1
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Reserve</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}