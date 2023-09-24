/* eslint-disable no-undef */
import React from "react";
import {  useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";
import {  updateLuggageCustomer } from "../../Api/services/LuggageService";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import { InputLabel, MenuItem,Select } from "@mui/material";
import { useQuery } from 'react-query';
import { getAllLuggages } from "../../Api/services/LuggageService";


function ViewLuggageTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [luggageid, setLuggageID] = useState("");
  const [DeliveryDisplay, setDeliveryDisplay] = useState(false);
  const handleClose = () => setDeliveryDisplay(false);
  const customeremail = useSelector((state) => state.auth.User.email);
  const [location, setLocation] = React.useState('');
  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getAllLuggages(customeremail),
  });
console.log("data",data)
  const handleChange = (event) => {
    const newLocation = event.target.value
    setLocation(newLocation);
  };


 async function handleUpdate() {
  try {
    const updatedLocation = await updateLuggageCustomer(luggageid, location);
    console.log("updatedLocation", updatedLocation);
    handleClose();
    toast.success("Updated Successfully Will Deliver Soon to Check Point");
  } catch (error) {
    // Handle errors if the retrieval fails
    console.error("Error fetching luggage data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows =
    data?.length > 0
      ? data.filter(
          (row) =>
            row?.customerToken?.toLowerCase().includes(search.toLowerCase()) 
        )
      : [];

      const handleDelivery = (luggageid) => {
        setDeliveryDisplay(true);
        setLuggageID(luggageid);
      }
  return (
    <div style={{ marginTop: "5%", marginLeft: "5%" }}>
      <ToastContainer/>
      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredRows.length === 0 ? (
        <p>No baggages available to track</p>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Total Bags</TableCell>
                  <TableCell>Shops</TableCell>
                  <TableCell>BagNo</TableCell>
                  <TableCell>Your Token</TableCell>
                  <TableCell>Delivery</TableCell>
                </TableRow>
              </TableHead>
              {console.log("filteredRows", filteredRows)}
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.totalBags}>
                      <TableCell>{row.uniqueShops.ShopID}</TableCell>
                      <TableCell>{row.uniqueShops.ShopName}</TableCell>
                      <TableCell>{row.customerToken}</TableCell>
                      {/* <TableCell>{row.isComplete ? "Yes" : "No"}</TableCell> */}
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => handleDelivery(row._id)}
                        >
                          Deliver Now
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      <Modal
        show={DeliveryDisplay}
        onHide={handleClose}
        style={{ marginTop: "8%", marginLeft: "4%" }}
      >
        <Modal.Header   closeButton> Baggage Delivery🛍️ </Modal.Header>
        <Modal.Body>
        <InputLabel htmlFor="outlined-adornment-old-password">
           Select Exiting Point
          </InputLabel>
          <Select
          fullWidth
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={location}
    label="Delivery Location"
    onChange={handleChange}
  >
    <MenuItem value={1}>Exit 1</MenuItem>
    <MenuItem value={2}>Exit 2</MenuItem>
    <MenuItem value={3}>Exit 3</MenuItem>
  </Select>
 <Button 
 sx={{marginTop:"6%",marginLeft:"8%"}}
 onClick={() => handleUpdate()}
 >
  Deliver Now
 </Button>

        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewLuggageTable;
