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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const ViewParkingSlots = () => {
  
  
  const [data, setData] = useState([]);
  
  useEffect(() => {

    axios.get('http://localhost:5050/slot/getAll')
      .then((response) => {
        setData(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching data from MongoDB:', error);
      });
  }, []);
 
  const handleButtonClick = () => {
    navigation('/admin/addParkingSlot');
  };
  const navigation = useNavigate();
  // Sort the data by slot number

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5050/slot/delete/${id}`)
      .then((res) => {
        console.log(`product ${id} deleted`);        
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
      });
  };

  const sortedData = data.sort((a, b) => a.slotNumber - b.slotNumber);
  
  return (
    <>
    <ThemeProvider theme={defaultTheme}>
     
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
     <div>
      <Stack spacing={2}>
         <Button variant="contained" style={{ width: '200px' }} onClick={handleButtonClick}>Add Slots</Button>
      </Stack>   
    </div>
    <br/>
    <TableContainer component={Paper} >
      <Table md={{ minWidth: 300 }} aria-label="MongoDB table">
        <TableHead>
          <TableRow>
            <TableCell >Slot Number</TableCell>
            <TableCell>Floor</TableCell>
            <TableCell>Vehicle Type</TableCell>
            <TableCell>Availability</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
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
              <TableCell>{row.isAvailable ? "Available" : "Unavailable"}</TableCell>
              <TableCell><Button variant="contained" style={{ width: '150px' }} onClick={handleButtonClick}>Edit</Button></TableCell>
              <TableCell><Button variant="contained"color="error" style={{ width: '150px' }} onClick={() => deleteBook(row._id)}>Delete</Button></TableCell>
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
