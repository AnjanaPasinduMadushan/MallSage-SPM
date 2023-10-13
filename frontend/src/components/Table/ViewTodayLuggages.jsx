import MaterialReactTable from 'material-react-table';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import { deleteluggagebyId, getLuggagesByShopIDandDate, getLuggagesByuserIdandDate } from '../../Api/services/LuggageService';
import { getShopIdByUserId } from '../../Api/services/shopService';
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Button, Badge, TablePagination } from '@mui/material';

function ViewTodayLuggages() {

    const userid = useSelector((state) => state.auth.User._id);

    const currentdate = new Date();
console.log("userid",userid)
    const date = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate();
    const { data, isLoading, error, isError } = useQuery({
        queryFn: () => getLuggagesByuserIdandDate(userid, date),
    });
    console.log("data", data)

    const handleDownloadPdf = (pdfLink) => {
        // Create an anchor element
        const link = document.createElement('a');
        link.href = pdfLink; // Set the link's href to the PDF file's URL
        link.download = 'bill.pdf'; // Set the desired file name for the downloaded PDF
        link.click(); // Programmatically trigger the click event on the link
    };

    // Add pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page to 0 when rows per page changes
    };

    const handleLuggageDelete = async (id) => {
        try {
            const res = await deleteluggagebyId(id)
            .then((res) => {
                toast.success('Luggage deleted successfully');
                refetch();
            })
            }catch (err) {
            console.log(err);
           toast.error('Something went wrong');
        }
    }

    return (
        <>
        <ToastContainer />
        <Paper sx={{ width: '70%', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px" }}>
            <TableContainer sx={{ maxHeight: 440, borderRadius: "20px" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                                CustomerID
                            </TableCell>
                            <TableCell align="center" colSpan={3}>
                                Customer Email
                            </TableCell>
                            <TableCell align="center" colSpan={3}>
                                Date
                            </TableCell>
                            <TableCell align="center" colSpan={3}>
                                Status
                            </TableCell>
                            <TableCell align="center" colSpan={3}>
                                Bill
                            </TableCell>
                            <TableCell align="center" colSpan={3}>
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data ? (
                            data?.luggages?.map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.CustomerID}>
                                    <TableCell align="center" colSpan={2}>
                                        {row.CustomerID}
                                    </TableCell>
                                    <TableCell align="center" colSpan={3}>
                                        {row.CustomerEmail}
                                    </TableCell>
                                    <TableCell align="center" colSpan={3}>
                                        {new Date(row.Date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })}
                                    </TableCell>
                                    <TableCell align="center" colSpan={3}>
                                        <Badge
                                            color={row.isComplete ? 'success' : 'error'}
                                            badgeContent={row.isComplete ? 'Completed' : 'Pending'}
                                        />
                                    </TableCell>
                                    <TableCell align="center" colSpan={3}>
                                        <Button
                                            onClick={() => window.open(row.Bill, '_blank')}
                                            sx={{
                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                                color: "black",
                                                borderRadius: "20px",
                                                '&:hover': {
                                                    backgroundColor: "#fff",
                                                    color: "#1A2027",
                                                    border: "1px solid #1A2027",
                                                },
                                            }}
                                        >
                                            PDF
                                        </Button>
                                        
                                    </TableCell>
                                    <TableCell align="center" colSpan={3}>
                                        <Button
                                          onClick={() => handleLuggageDelete(row._id)}
                                            sx={{
                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                                color: "black",
                                                borderRadius: "20px",
                                                '&:hover': {
                                                    backgroundColor: "#fff",
                                                    color: "#1A2027",
                                                    border: "1px solid #1A2027",
                                                },
                                            }}
                                            startIcon={<DeleteIcon />}
                                        >
                                          Delete
                                        </Button>
                                        
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]} // Customize the number of rows per page options
                component="div"
                count={data?.luggages?.length || 0} // Total number of rows
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper >
        </>
    );
}

export default ViewTodayLuggages;