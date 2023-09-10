import { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Button, Typography, Card, CardContent, Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
const ShowAllLocations = ({ handleOnClick }) => {

  const [locations, setLocations] = useState([])

  useEffect(() => {
    const getLocations = async () => {
      const res = await axios.get('http://localhost:5000/restingLocation').catch((err) => {
        console.log(err)
      })
      setLocations(res.data.locations)
      console.log(res.data.locations)
    }

    getLocations();
  }, []);

  console.log(locations)
  return (
    <Box mt={3}>
      < Typography variant='h3' align='center' gutterBottom >
        Customer Rest Zones
      </Typography >
      <Grid container spacing={3}>
        {locations.map((location, key) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Card>
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
                    <li key={key}>{feature}</li>
                  ))}
                </ul>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOnClick(location._id)}
                  style={{ marginTop: '10px' }}
                >
                  More Info...
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>

  )
}



export default ShowAllLocations