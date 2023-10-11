import MaterialReactTable from 'material-react-table';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getLuggagesByShopIDandDate, getLuggagesByuserIdandDate } from '../../Api/services/LuggageService';
import { getShopIdByUserId } from '../../Api/services/shopService';
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Button, Badge, TablePagination, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ShopLuggageHistory() {

    const userid = useSelector((state) => state.auth.User._id);
    const currentDate = new Date();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [data, setData] = useState(null);
console.log("data",data)
    // Move the data fetching logic into a separate function
    const fetchData = async (date) => {
        try {
            const formattedDate = date.toISOString().split('T')[0];
            const result = await getLuggagesByuserIdandDate(userid, formattedDate);
            setData(result);
        } catch (error) {
            // Handle errors here
        }
    };

    useEffect(() => {
        // Fetch data when the component mounts and when selectedDate changes
        fetchData(selectedDate);
    }, [userid, selectedDate]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const handleDownloadPdf = (pdfLink) => {
        // Create an anchor element
        const link = document.createElement('a');
        link.href = pdfLink;
        link.download = 'bill.pdf';
        link.click();
    };

 

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <>
            <Typography sx={{ color: "black", marginTop: "6%", marginLeft: "6%", fontSize: "30px" }}>
                Luggage History
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={{ width: '20%', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", marginLeft: "8%", marginTop: "6%", justifyContent: "center" }}>
                    <DatePicker label="Choose A Date" onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        sx={{
                            "& fieldset": {
                                border: "none",
                                width: '100%',
                            },
                        }}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <Paper sx={{ width: '87%', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", marginLeft: "8%", marginTop: "6%" }}>
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
                                                Download PDF
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


export default ShopLuggageHistory