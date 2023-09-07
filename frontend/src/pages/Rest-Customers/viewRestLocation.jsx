import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Grid, Paper, styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ViewRestLocation = () => {

  const [location, setLocation] = useState({});

  const { id } = useParams();

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
  }, [id])

  console.log(location);

  return (
    <><Box display="flex" justifyContent="center">
      <Typography variant="h1" component="h2">
        {location?.locationName}
      </Typography>
    </Box>
      <Grid container spacing={2} columns={16} display="flex" justifyContent="center">
        <Grid item xs={6}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=8</Item>
        </Grid>
        <br />
        <Grid>
          {location.locationFeatures && location.locationFeatures.map((location, key) => (
            <Typography key={key}>{location}</Typography>
          ))}
        </Grid>
      </Grid>

    </>
  )
}

export default ViewRestLocation;