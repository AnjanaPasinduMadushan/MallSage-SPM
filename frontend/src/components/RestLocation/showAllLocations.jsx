import { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, styled, Paper, Button } from '@mui/material';

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
  }, [])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  console.log(locations)
  return (
    <>
      <h1>showAllLocations</h1>
      <div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {locations.map((location, key) => (
            <Grid item xs={6} key={key}>
              <Item>
                <h1>{location.locationName}</h1>
                <h1>{location.locationPlaced}</h1>
                <h1>Features</h1>
                <div>{location.locationFeatures.map((feature, key) => (
                  <h2 key={key}>{feature}</h2>
                ))}</div>
                <Button onClick={() => handleOnClick(location._id)}>View</Button>
              </Item>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  )
}



export default ShowAllLocations