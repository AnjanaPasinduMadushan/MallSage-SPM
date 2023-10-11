import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAllLuggages } from "../../Api/services/LuggageService";
import Calendar from "react-calendar";
import { useQuery } from "react-query";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { Modal } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers";

function LuggageBox() {
  const customeremail = useSelector((state) => state.auth.User.email);
  const name = useSelector((state) => state.auth.User.name);
  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getAllLuggages(customeremail),
  });

  const [date, setDate] = useState(new Date());
  const [deliverymodal, setShowDeliveryModal] = useState(false);
  const handleDeliveryModalOpen = () => setShowDeliveryModal(true);
  const handleDeliveryModalClose = () => setShowDeliveryModal(false);
  const [location, setLocation] = useState(""); // Define and initialize location

  // Custom function to determine if a date is a weekend (Saturday or Sunday)
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // Custom function to determine if a date is the current date
  const isCurrentDate = (dateToCheck) => {
    const currentDate = new Date();
    return (
      dateToCheck.getDate() === currentDate.getDate() &&
      dateToCheck.getMonth() === currentDate.getMonth() &&
      dateToCheck.getFullYear() === currentDate.getFullYear()
    );
  };

  // Custom CSS class names for different date types
  const tileClassName = ({ date }) => {
    if (isWeekend(date)) {
      return "weekend";
    } else if (isCurrentDate(date)) {
      return "current-date";
    }
    return "";
  };

  const columns = [
    {
      header: "ShopID",
      accessorKey: "ShopID",
    },
    {
      header: "ShopName",
      accessorKey: "ShopName",
    },
  ];

  function CircularWithValueLabel() {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 10
        );
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);

    return <CircularProgress value={progress} />;
  }

  let mappedData;

  if (data !== undefined) {
    mappedData =
      data?.uniqueShops?.map((shop) => ({
        ShopID: shop.ShopID,
        ShopName: shop.ShopName,
      })) || [];
  } else {
    mappedData = [];
  }

  return (
    <div
    >
      {isLoading ? (
        <CircularWithValueLabel />
      ) : (
        <Box
          sx={{
            borderRadius: "40px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            width: "94%",
            height: "80vh",
            padding: "10px",
            marginLeft: "3vw",
            marginTop: "5vh",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Your Baggages💼
          </Typography>
          <Button
            sx={{ marginRight: "15%", border: "1px solid black", borderRadius: "8px",marginTop: "2%", marginLeft: "2%" }}
            // onClick={handleButtonClick}
          >
            <ArrowBackIcon style={{ marginLeft: "5px" }} />
            Back to Home
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >

            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                marginTop: "3%",
                marginLeft: "2%",
              }}
            >
              {data ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "20vw",
                  }}
                >
                  Total Baggages:{" "}
                  <Box
                    sx={{
                      borderRadius: "40px",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      width: "2vw",
                      justifyContent: "center",
                      justifyItems: "center",
                      textAlign: "center",
                      marginLeft: "6%",
                    }}
                  >
                    {data.totalBags}
                  </Box>
                </div>
              ) : (
                "No baggage to be delivered"
              )}
            </Typography>
            <Button
              sx={{
                mt: 2,
                borderRadius: '18px', // Make this consistent with other borderRadius values
                width: '20vw',
                marginLeft: '1%',
                color: 'white',
                marginTop: '2.7%',
                height: '4vh',
                fontSize: '1.0rem',
                backgroundColor: '#1769aa', // Move backgroundColor here
              }}
            >
              View Your Token
            </Button>
            <Button
              sx={{
                mt: 2,
                borderRadius: '18px', // Make this consistent with other borderRadius values
                width: '20vw',
                marginLeft: '3%',
                color: 'white',
                marginTop: '2.7%',
                height: '4vh',
                fontSize: '1.0rem',
                backgroundColor: '#1769aa', // Move backgroundColor here
              }}
              onClick={handleDeliveryModalOpen}
            >
              Deliver Baggages
            </Button>
            <Button
              sx={{
                mt: 2,
                borderRadius: '18px', // Make this consistent with other borderRadius values
                width: '20vw',
                marginLeft: '3%',
                color: 'white',
                marginTop: '2.7%',
                height: '4vh',
                fontSize: '1.0rem',
                backgroundColor: '#1769aa', // Move backgroundColor here
              }}
              onClick={handleDeliveryModalOpen}
            >
              Forgot Your Baggage?
            </Button>
          </div>
          <div
            style={{
              marginTop: "8%",
            }}
          >

            <MaterialReactTable columns={columns} data={mappedData} />
          </div>
        </Box>
      )}
      <Modal
        show={deliverymodal}
        onHide={handleDeliveryModalClose}
        style={{ marginTop: "8%" }}
      >
        <Modal.Header closeButton>Baggage Delivery🛍️</Modal.Header>
        <Modal.Body>
          <InputLabel htmlFor="outlined-adornment-old-password">
            Select Exiting Point
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Delivery Location"
          >
            <MenuItem value={1}>Exit 1</MenuItem>
            <MenuItem value={2}>Exit 2</MenuItem>
            <MenuItem value={3}>Exit 3</MenuItem>
          </Select>
          <InputLabel htmlFor="outlined-adornment-old-password"
            style={{
              marginTop: "5%",
              marginLeft: "5%"
            }}
          >
            Select Delivery Time
          </InputLabel>
          <div
            style={{
              display: "flex",
              marginLeft: "5%"
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker defaultValue={dayjs()} />
            </LocalizationProvider>
            <Button
              sx={{
                marginLeft: "15%",
                borderRadius: "40px",
                backgroundColor: "#0276aa",
                color: "white",
                height: "6vh"
              }}
            >
              Deliver Now
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default LuggageBox;
