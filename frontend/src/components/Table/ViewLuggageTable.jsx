/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";
import { getLuggageIdByUserId } from "../../Api/services/LuggageService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

function ViewLuggageTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [luggages, setLuggages] = useState([]);
  const [DeliveryDisplay, setDeliveryDisplay] = useState(false);
  const handleClose = () => setDeliveryDisplay(false);
  const customeremail = useSelector((state) => state.auth.User.email);
  console.log("customeremail", customeremail);
  console.log("luggages", luggages);

  useEffect(() => {
    async function fetchLuggages() {
      try {
        const response = await getLuggageIdByUserId(customeremail);
        setLuggages(response);
        console.log(response);
        console.log(luggages);
        // console.log("luggages", luggages);
        toast.success("Retrieved Successfully");
      } catch (error) {
        // Handle errors if the retrieval fails
        console.error("Error fetching luggage data:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
      }
    }

    // Call the async function to fetch data
    fetchLuggages();
  }, [customeremail]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows =
    luggages?.luggageList?.length > 0
      ? luggages?.luggageList.filter(
          (row) =>
            row?.luggageID?.toLowerCase().includes(search.toLowerCase()) ||
            row?.ShopID?.toLowerCase().includes(search.toLowerCase()) ||
            row?.BagNo?.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <div style={{ marginTop: "5%", marginLeft: "5%" }}>
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
                  <TableCell>BaggageID</TableCell>
                  <TableCell>ShopID</TableCell>
                  <TableCell>BagNo</TableCell>
                  <TableCell>isComplete</TableCell>
                  <TableCell>Delivery</TableCell>
                </TableRow>
              </TableHead>
              {console.log("filteredRows", filteredRows)}
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.luggageID}>
                      <TableCell>{row.luggageID}</TableCell>
                      <TableCell>{row.ShopID}</TableCell>
                      <TableCell>{row.BagNo}</TableCell>
                      <TableCell>{row.isComplete ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => setDeliveryDisplay(true)}
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
          



        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewLuggageTable;
