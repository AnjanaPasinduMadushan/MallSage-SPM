// import BadgeIcon from '@mui/icons-material/Badge';
import { useEffect } from "react"
import axios from 'axios'
axios.defaults.withCredentials = true;
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import LuggageIcon from '@mui/icons-material/Luggage';
// import BookIcon from '@mui/icons-material/Book';
// import LocalParkingIcon from '@mui/icons-material/LocalParking';
// import InterestsIcon from '@mui/icons-material/Interests';
import { useNavigate } from "react-router-dom";
import ViewTodayLuggages from "../../components/Table/ViewTodayLuggages";
import PieChart from "../../components/Charts/PieChart";
import { Typography } from "@mui/material";

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
export const ShopHome = () => {

  const navigate = useNavigate();


  return (
    <>
    <Typography sx={{color:"black", marginTop:"6%", marginLeft:"6%", fontSize:"30px"}}>
      Ongoing Luggages
    </Typography>
    <div
    style ={{
      marginTop: '3%',
      marginLeft: '13%',
      display: 'flex',
    }}
    >
       <ViewTodayLuggages/>
       <>  <PieChart/></>
       
    </div>
    </>
    

  )
}
