import { Button, Grid, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react/prop-types
const CheckBtn = ({ locationId }) => {
  console.log(locationId)
  const [code, setCode] = useState(null);
  const [msg, setMsg] = useState("");

  const handlecheckSubmit = async (e) => {
    e.preventDefault();
    const intConvertCode = parseInt(code);
    try {
      const res = await axios.patch(`http://localhost:5050/restingLocation/updateToTrue/${locationId}`, {
        qrCode: intConvertCode
      })
      console.log(res.data.message)
      setMsg(res.data.message);
      toast.info(res.data.message);
      await res.data;
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.info(err.response.data.message)
      }

    }

  };

  return (
    <>
      <Grid display="flex" justifyContent="center">
        <TextField
          name="code"
          required
          id="name"
          placeholder='Check Gate Code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          inputProps={{ style: { height: "5px" } }}
          sx={{ marginRight: 2 }}
        />
        <Tooltip title="To check pre-reserved qrCodes">
          <Button
            variant="outlined"
            onClick={handlecheckSubmit}
          >
            Check
          </Button>
        </Tooltip>
      </Grid>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable pauseOnVisibilityChange />
    </>
  )
}

export default CheckBtn