import { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Button, Typography, Card, CardContent, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

// eslint-disable-next-line react/prop-types
const ShowAllLocations = ({ handleOnClick }) => {

  const [locations, setLocations] = useState([])

  const loggeduserRole = useSelector((state) => state.auth.User.role);
  console.log(loggeduserRole)

  useEffect(() => {
    const getLocations = async () => {
      const res = await axios.get('http://localhost:5050/restingLocation').catch((err) => {
        console.log(err)
      })
      setLocations(res.data.locations)
      console.log(res.data.locations)
    }

    getLocations();
  }, []);

  const handleOnDelete = (locationId) => {
    console.log(locationId)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Location!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Location is deleted successfully!", {
            icon: "success",
            buttons: false,
            timer: 2000,
          });
          axios.delete(`http://localhost:5050/restingLocation/${locationId}`)
            .then((res) => {

              const filterdLocations = locations.filter(location => location._id !== locationId)

              setLocations(filterdLocations);

            }).catch((err) => {

              console.log(err.message);
            })

        } else {
          swal({
            text: "Location is saved!",
            buttons: false,
            timer: 2000
          })
        }
      });
  }


  console.log(locations)
  return (
    <Box mt={3}>
      <Typography variant='h3' align='center' gutterBottom style={{ fontFamily: 'Ninoto', fontWeight: 'bold' }}>
        RESTING ZONES
      </Typography >
      <Grid container spacing={3}>
        {locations.map((location, key) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Card style={{ backgroundColor: "#94E4FF", color: 'darkblue', border: '2px solid black', margin: '6px', textAlign: 'center' }} >
              <CardContent>
                <Typography variant="h5" component="div">
                  {location.locationName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Location:</strong> {location.locationPlaced}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Availability:</strong> {location.availability}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Features:</strong>
                </Typography>
                <ul>
                  {location.locationFeatures.map((feature, key) => (
                    <li key={key} style={{ textAlign: 'left' }}>{feature}</li>
                  ))}
                </ul>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleOnClick(location._id)}
                  >
                    More Info...
                  </Button>
                  {loggeduserRole === 'admin' && (
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => handleOnDelete(location._id)}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>

  )
}



export default ShowAllLocations