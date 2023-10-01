import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
export default function FormDialog({ locationName, locationId, availability, onReservationComplete, currentNoReserved }) {

  const loggeduserId = useSelector((state) => state.auth.User._id);
  const loggeduserRole = useSelector((state) => state.auth.User.role);
  const loggedUserMail = useSelector((state) => state.auth.User.email);

  console.log(loggeduserRole)

  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    no: 0,
    userId: loggeduserId
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
        Reserved: [{ no: intoNumber, userId: input.userId }],
        userRole: loggeduserRole,
        email: loggedUserMail,
        locationName: locationName
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
    if (availability === currentNoReserved) {
      return false;
    }
    return true;
  }

  return (
    <>
      <Tooltip title="To add a shopper to the Location">
        <Button variant="outlined" onClick={handleClickOpen} disabled={isChecking && isChecking === false} >
          Hold
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Coming inside???</DialogTitle>
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
              min: 2
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hold</Button>
        </DialogActions>
      </Dialog>
    </>
  );

}