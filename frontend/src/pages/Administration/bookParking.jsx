import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody,Container, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, Typography, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import PopUp from '../../components/Security/popUpBox';
import PopUp2 from '../../components/Security/TicketPopUp'

const AvailableParkingSlots = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({vehicleType:'any'});


  useEffect(() => {
    // Apply filters to the data.
    let filtered = [...data];
    if(filters.vehicleType=='any'){
        axios.get(`http://localhost:5050/slot/getAll`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }else{
    axios.get(`http://localhost:5050/slot/getSlot/${filters.vehicleType}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
    setFilteredData(filtered);
  }, [data]);

  const handleFilterChange = async (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
    if(filters.vehicleType=='any'){
        await axios.get(`http://localhost:5050/slot/getAll`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }else{
    await axios.get(`http://localhost:5050/slot/getSlot/${filters.vehicleType}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
  };
 


  return (
    <div>
      <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>            
            <Typography component="h1" variant="h5">
            Parking Slots Details
            </Typography>
            </Box>     
            <FormControl>
        <InputLabel>Vehicle Type</InputLabel>
        <Select name="vehicleType" value={filters.vehicleType} onChange={handleFilterChange}>
            <MenuItem value="any">All</MenuItem>
            <MenuItem value="car">Car</MenuItem>
            <MenuItem value="bike">Motor Bike</MenuItem>
        </Select>
      </FormControl>
      
      <TableContainer component={Paper} >
        <Table aria-label="Parking Slots Table">
          <TableHead>
            <TableRow>
              <TableCell>Slot Number</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Vehicle Type</TableCell>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Book</TableCell>
              <TableCell>End Booking</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {filteredData.length === 0 ? (
    <TableRow>
      <TableCell colSpan={5}>No records found</TableCell>
    </TableRow>
  ) : (
    filteredData.map((row) => (
      <TableRow key={row._id}>
        <TableCell>{row.slotNumber}</TableCell>
        <TableCell>{row.floor}</TableCell>
        <TableCell>{row.vehicleType}</TableCell>
        <TableCell>{row.vehicleNumber}</TableCell>
        <TableCell>{row.isAvailable ? "Available" : "Unavailable"}</TableCell>
        <TableCell>
        <PopUp Id={row._id} available={row.isAvailable} />
        </TableCell>
        <TableCell>
       <PopUp2 id={row._id} available={row.isAvailable}/>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

        </Table>
      </TableContainer>
     
      
      </Container>
    </div>
  );
};

export default AvailableParkingSlots;
