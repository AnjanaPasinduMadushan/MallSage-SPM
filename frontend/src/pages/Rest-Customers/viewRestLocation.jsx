/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Grid } from "@mui/material";
import FormDialog from "../../components/style-Components/form-dialog";

const ViewRestLocation = () => {

  const [location, setLocation] = useState({});
  const [qrCodeGenarated, setQrCodeGenarated] = useState(null);

  const { id } = useParams();

  const handleReservationData = (reservationData) => {
    setQrCodeGenarated(reservationData.uniqueNo);
    console.log("Reservation data:", reservationData.uniqueNo);
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/restingLocation/${id}`);
        setLocation(res.data.location);
        console.log(res.data.location);
      } catch (err) {
        console.log(err);
      }
    }
    getLocation();
  }, [id, qrCodeGenarated])

  const availabilityMinusCurrentReserved = location?.availability - location?.currentNoReserved;

  return (
    <><Box display="flex" justifyContent="center">
      <Typography variant="h1" component="h2">
        {location?.locationName}
      </Typography>
    </Box>
      <Grid container spacing={2} columns={16} display="flex" justifyContent="center">
        <Grid item xs={8}>
          <Typography variant="h3">Current Seates Availble</Typography>
          <Typography variant="h1" component="h2">{availabilityMinusCurrentReserved}</Typography>
        </Grid>
        {typeof qrCodeGenarated === 'number' && (
          <Grid container spacing={2} columns={16} display="flex" justifyContent="center">
            <Typography>{qrCodeGenarated}</Typography>
          </Grid>
        )}
        <Grid item xs={4} mt={14}>
          <FormDialog locationId={id} availability={location.availability} onReservationComplete={handleReservationData} currentNoReserved={location.currentNoReserved} />
        </Grid>
      </Grid>

      <br />
      <Grid container spacing={2} columns={16} display="flex" justifyContent="center">
        <Typography>Features of this Resting Location</Typography>
        {location.locationFeatures && location.locationFeatures.map((location, key) => (
          <Typography key={key}>{location}</Typography>
        ))}
      </Grid>
    </>
  )
}

export default ViewRestLocation;