import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BasicTable() {

  const [locations, setLocations] = useState([])
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

  console.log(locations)

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">Features</TableCell>
              <TableCell align="center">Kids Zone</TableCell>
              <TableCell align="center">Foods & Beverages</TableCell>
              <TableCell align="center">Library</TableCell>
              <TableCell align="center">TV</TableCell>
              <TableCell align="center">Senior-friendly</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((row) => (
              <TableRow
                key={row.locationName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.locationName}
                </TableCell>
                <TableCell align="center">{row.locationFeatures.includes('Kids Zone') ? '✅' : '❌'}</TableCell>
                <TableCell align="center">{row.locationFeatures.includes('Foods & Beverages') ? '✅' : '❌'}</TableCell>
                <TableCell align="center">{row.locationFeatures.includes('Library') ? '✅' : '❌'}</TableCell>
                <TableCell align="center">{row.locationFeatures.includes('TV') ? '✅' : '❌'}</TableCell>
                <TableCell align="center">{row.locationFeatures.includes('Senior-friendly') ? '✅' : '❌'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
