import BadgeIcon from '@mui/icons-material/Badge';
import { useEffect } from "react"
import axios from 'axios'
axios.defaults.withCredentials = true;
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import LuggageIcon from '@mui/icons-material/Luggage';
import BookIcon from '@mui/icons-material/Book';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import InterestsIcon from '@mui/icons-material/Interests';
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '25px',
  cursor: "pointer"
}));
export const AdminHome = () => {

  const navigate = useNavigate();

  //Testing api call(line no 8 - 25)
  const userProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5050/user/profile", {
        withCredentials: true,
      })

      const data = res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    userProfile();
  }, [])

  return (
    <>
      {/* <AdminHeader /> */}
      <Box m={15} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item onClick={() => navigate('/addEmployee')}>Add Employees<BadgeIcon /></Item>
          </Grid>
          <Grid item xs={6}>
            <Item onClick={() => navigate('/showAllLocations')}>Resting Location Tracking System<InterestsIcon /></Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Car Parking Reservation System<LocalParkingIcon /></Item>
          </Grid>
          <Grid item xs={6}>
            <Item onClick={() => navigate('/securityHome')}>Security Luggage Collection<BookIcon /></Item>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
