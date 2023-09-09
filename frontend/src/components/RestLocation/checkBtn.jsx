import { Button, Grid, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const CheckBtn = ({ locationId }) => {
  console.log(locationId)
  const [code, setCode] = useState(null);

  const handlecheckSubmit = async (e) => {
    e.preventDefault();
    const intConvertCode = parseInt(code);
    try {
      const res = await axios.patch(`http://localhost:5000/restingLocation/updateToTrue/${locationId}`, {
        qrCode: intConvertCode
      })

      await res.data;
    } catch (err) {
      console.log(err);
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
    </>
  )
}

export default CheckBtn