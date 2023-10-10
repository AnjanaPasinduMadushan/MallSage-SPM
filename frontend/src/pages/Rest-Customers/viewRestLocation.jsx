/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Card, CardContent } from "@mui/material";
import FormDialog from "../../components/style-Components/form-dialog";
import Header from "../../components/Headers/header";

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
    <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
      <Box mt={8}>
        <Typography variant="h2" gutterBottom display="flex" justifyContent="center">
          {location?.locationName}
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h4" display="flex" justifyContent="center">No of Seats Available</Typography>
            <Typography variant="h4" display="flex" justifyContent="center">{availabilityMinusCurrentReserved}</Typography>
            {typeof qrCodeGenarated === 'number' && (
              <Box>
                <Typography variant="h4" display="flex" justifyContent="center">Your Reservation Number</Typography>
                <Typography variant="h3" display="flex" justifyContent="center">{qrCodeGenarated}</Typography>
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <FormDialog
                locationName={location?.locationName}
                locationId={id}
                availability={location?.availability}
                onReservationComplete={handleReservationData}
                currentNoReserved={location?.currentNoReserved}
              />
            </Box>
          </CardContent>
        </Card>
        <br />
        <Typography variant="h5">Features of this Resting Location</Typography>
        {location.locationFeatures && location.locationFeatures.map((feature, key) => (
          <Typography key={key}><ul>{feature}</ul></Typography>
        ))}
      </Box>
    </Box>
  )
}

export default ViewRestLocation;