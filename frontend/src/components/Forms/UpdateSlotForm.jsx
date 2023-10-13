import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel, FormGroup, FormControlLabel, Checkbox ,Select ,FormControl,MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import axios from 'axios';

const defaultTheme = createTheme();

const UpdateParkingSlot = () => {

  // const dispatch = useDispatch();    
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    slotNumber: "",
    floor: "",
    vehicleType: "",
    
  })

  const handleChange = async (e) => {
    const { name, value, checked } = e.target;
      setInputs((previousState) => ({
        ...previousState,
        [name]: value,
  }));
    }
    console.log(inputs)
  

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(inputs)
    try {
      const res = await axios.post('http://localhost:5050/slot/add', {
        slotNumber: inputs.number,
        floor: inputs.floor,
        vehicleType: inputs.vehicleType,
      });
      const data = await res.data;
      console.log(data);
      navigate('/admin/viewParkingSlots');
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LocalParkingIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              ADD PARKING SLOTs
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={15}>
                  <TextField
                    name="number"
                    required
                    fullWidth
                    id="number"
                    label="Slot Number"
                    value={inputs.number}
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={15}>
                  <TextField
                    name="floor"
                    required
                    fullWidth
                    id="floor"
                    label="Floor"
                    value={inputs.floor}
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={15}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    value={inputs.vehicleType}
                    onChange={handleChange}
                    name="vehicleType"
                  >
                    <MenuItem value="car">Car</MenuItem>
                    <MenuItem value="bike">Mortor Bike</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ADD
              </Button>
            </Box>
          </Box>

        </Container>
      </ThemeProvider>
    </>
  )
}

export default UpdateParkingSlot