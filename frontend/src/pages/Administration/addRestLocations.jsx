import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InterestsIcon from '@mui/icons-material/Interests';
import axios from 'axios';

const defaultTheme = createTheme();

const AddRestLocations = () => {

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    place: "",
    availability: "",
    features: []
  })

  const handleChange = async (e) => {
    const { name, value, checked } = e.target;

    if (name === 'features') {
      // If the checkbox is checked, add the value to the features array; otherwise, remove it
      setInputs((previousState) => ({
        ...previousState,
        features: checked
          ? [...previousState.features, value]
          : previousState.features.filter((feature) => feature !== value),
      }));
    } else {
      setInputs((previousState) => ({
        ...previousState,
        [name]: value,
      }));
    }
    console.log(inputs)
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(inputs)
    try {
      const res = await axios.post('http://localhost:5000/restingLocation/addRestingLocation', {
        locationName: inputs.name,
        locationPlaced: inputs.place,
        availability: inputs.availability,
        locationFeatures: inputs.features
      });
      const data = await res.data;
      console.log(data);
      navigate('/adminhome');
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
              <InterestsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ADD LOCATIONs
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={15}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Location Name"
                    value={inputs.name}
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={15}>
                  <TextField
                    autoComplete="given-name"
                    name="place"
                    required
                    fullWidth
                    id="place"
                    label="Location Placed"
                    value={inputs.place}
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={15}>
                  <TextField
                    autoComplete="given-name"
                    name="availability"
                    required
                    fullWidth
                    id="availability"
                    label="Seats Availaility"
                    value={inputs.availability}
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={15}>

                  <InputLabel id="demo-simple-select-label">Features Available</InputLabel>
                  <FormGroup>
                    <FormControlLabel onChange={handleChange} control={<Checkbox />} name="features" label="Kids Zone" value="Kids Zone" />
                    <FormControlLabel onChange={handleChange} control={<Checkbox />} name="features" label="Foods & Beverages" value="Foods & Beverages" />
                    <FormControlLabel onChange={handleChange} control={<Checkbox />} name="features" label="Library" value="Library" />
                    <FormControlLabel onChange={handleChange} control={<Checkbox />} name="features" label="TV" value="TV" />
                    <FormControlLabel onChange={handleChange} control={<Checkbox />} name="features" label="Senior-friendly" value="Senior-friendly" />
                  </FormGroup>

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

export default AddRestLocations