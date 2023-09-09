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
import InterestsIcon from '@mui/icons-material/Interests';
import axios from "axios"
import { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom";
import FormDialogAdmin from '../../components/style-Components/form-dialog-admin';
import FormDialog from '../../components/style-Components/form-dialog';

const defaultTheme = createTheme();

const ViewLocation = () => {

  const [location, setLocation] = useState({
    locationName: '',
    locationPlaced: '',
    availability: 0,
    locationFeatures: [],
  });

  const [isChanged, setIsChanged] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getLocation = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/restingLocation/${id}`)
        setLocation(res.data.location);
      } catch (e) {
        console.log(e)
      }
    }
    getLocation();
  }, [id])

  // eslint-disable-next-line no-unused-vars
  const [qrCodeGenarated, setQrCodeGenarated] = useState(null);
  const handleReservationData = (reservationData) => {
    setQrCodeGenarated(reservationData.uniqueNo);
    console.log("Reservation data:", reservationData.uniqueNo);
  };

  const handleChange = async (e) => {
    const { name, value, checked } = e.target;

    if (name === 'features') {
      // If the checkbox is checked, add the value to the features array; otherwise, remove it
      setLocation((previousState) => ({
        ...previousState,
        locationFeatures: checked
          ? [...previousState.locationFeatures, value]
          : previousState.locationFeatures.filter((feature) => feature !== value),
      }));
    } else {
      setLocation((previousState) => ({
        ...previousState,
        [name]: value,
      }));
    }
    setIsChanged(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsChanged(false);
    try {
      const res = await axios.patch(`http://localhost:5000/restingLocation/${id}`, {
        locationName: location?.locationName,
        locationPlaced: location?.locationPlaced,
        locationFeatures: location?.locationFeatures,
        availability: location?.availability
      })

      await res.data;
    } catch (err) {
      console.log(err);
    }

  };

  const isDisableSaveButton = useMemo(() => {
    return isChanged;
  }, [isChanged])

  const handlePrint = () => {
    // Use the browser's print functionality
    window.print();
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
            <Grid>
              {typeof qrCodeGenarated === 'number' && (
                <Grid container spacing={2} columns={16} display="flex" justifyContent="center">
                  <Typography>{qrCodeGenarated}</Typography>
                  <Button variant="outlined" onClick={handlePrint}></Button>
                </Grid>
              )}
            </Grid>
            <FormDialogAdmin locationId={location._id} availability={location.availability} currentNoReserved={location.currentNoReserved} />
            <FormDialog locationId={location._id} availability={location.availability} onReservationComplete={handleReservationData} currentNoReserved={location.currentNoReserved} />
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <InterestsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ADD LOCATIONs
            </Typography>
            {location &&
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={15}>
                    <TextField
                      autoComplete="given-name"
                      name="locationName"
                      required
                      fullWidth
                      id="name"
                      label="Location Name"
                      value={location?.locationName}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={15}>
                    <TextField
                      autoComplete="given-name"
                      name="locationPlaced"
                      required
                      fullWidth
                      id="place"
                      label="Location Placed"
                      value={location?.locationPlaced}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={15}>
                    <Grid item xs={15}>
                      <TextField
                        autoComplete="given-name"
                        name="availability"
                        required
                        fullWidth
                        id="availability"
                        label="Seats Availaility"
                        value={location?.availability}
                        onChange={handleChange}
                        autoFocus
                      />
                    </Grid>
                    <InputLabel id="demo-simple-select-label">Features Available</InputLabel>
                    <FormGroup>
                      <FormControlLabel onChange={handleChange}
                        control={<Checkbox checked={location?.locationFeatures && location?.locationFeatures.includes('Kids Zone')} />}
                        name="features" label="Kids Zone" value="Kids Zone" />
                      <FormControlLabel onChange={handleChange}
                        control={<Checkbox checked={location?.locationFeatures && location?.locationFeatures.includes('Foods & Beverages')} />}
                        name="features" label="Foods & Beverages" value="Foods & Beverages" />
                      <FormControlLabel onChange={handleChange}
                        control={<Checkbox checked={location?.locationFeatures && location?.locationFeatures.includes('Library')} />}
                        name="features" label="Library" value="Library" />
                      <FormControlLabel onChange={handleChange}
                        control={<Checkbox checked={location?.locationFeatures && location?.locationFeatures.includes('TV')} />}
                        name="features" label="TV" value="TV" />
                      <FormControlLabel onChange={handleChange}
                        control={<Checkbox checked={location?.locationFeatures && location?.locationFeatures.includes('Senior-friendly')} />}
                        name="features" label="Senior-friendly" value="Senior-friendly" />
                    </FormGroup>

                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isDisableSaveButton}
                >
                  Save
                </Button>
              </Box>
            }
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default ViewLocation