import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'; 


const defaultTheme = createTheme();
const ViewParkingSlots = () => {
  const [data, setData] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:5000/slot/getAll')
      .then((response) => {
        setData(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching data from MongoDB:', error);
      });
  }, []);

  // Sort the data by slot number
  const sortedData = data.sort((a, b) => a.slotNumber - b.slotNumber);

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
     
    <Container component="main" maxWidth="xs">
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
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 300 }} aria-label="MongoDB table">
        <TableHead>
          <TableRow>
            <TableCell >Slot Number</TableCell>
            <TableCell>Floor</TableCell>
            <TableCell>Vehicle Type</TableCell>
            <TableCell>Availability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.slotNumber}
              </TableCell>
              <TableCell>{row.floor}</TableCell>
              <TableCell>{row.vehicleType}</TableCell>
              <TableCell>{row.isAvailable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </Container>
    </ThemeProvider>
    </>
  );
}

export default ViewParkingSlots;
