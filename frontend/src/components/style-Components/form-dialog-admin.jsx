import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Tooltip } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function FormDialogAdmin({ locationId, availability, currentNoReserved }) {

  const [msg, setMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    no: 0,
    qrCode: 0,
    isGetsIn: true
  });
  let intoNumber;
  let intoQrNumber;
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
    intoNumber = parseInt(input.no)
    intoQrNumber = parseInt(input.qrCode)
    try {
      const res = await axios.patch(`http://localhost:5050/restingLocation/decreaseReserved/${locationId}`, {
        no: intoNumber,
        qrCode: intoQrNumber,
        isGetsIn: input.isGetsIn
      }
      );
      console.log(res.data.message)
      setMsg(res.data.message);
      toast.success(res.data.message);
      const data = await res.data;
      console.log(data);
      setOpen(false);
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.message)
      }
    }
  }

  const isChecking = () => {
    const checkingResult = availability === currentNoReserved;
    return checkingResult;
  }

  return (
    <>
      <Tooltip title="To Check out a customer from here">
        <Button variant="contained" onClick={handleClickOpen} disabled={!isChecking} color="warning">
          Leave
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Stepping out???</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="qrCode"
            name="qrCode"
            label="QR code"
            type="number"
            fullWidth
            value={input.qrCode}
            onChange={handleChange}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
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
          <Button onClick={handleClose}>Leave</Button>
        </DialogActions>
      </Dialog>
    </>
  );

}