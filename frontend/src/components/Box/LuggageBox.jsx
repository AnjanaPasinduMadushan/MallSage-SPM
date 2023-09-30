import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAllLuggages } from "../../Api/services/LuggageService";
import Calendar from "react-calendar";
import { useQuery } from "react-query";
import { Box, Typography, CircularProgress } from "@mui/material";
import LiveClockUpdate from "../LiveClock/LiveClock";
import "react-calendar/dist/Calendar.css";
import { MaterialReactTable } from "material-react-table";

function LuggageBox() {
  const customeremail = useSelector((state) => state.auth.User.email);
  const name = useSelector((state) => state.auth.User.name);
  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getAllLuggages(customeremail),
  });

  const [date, setDate] = useState(new Date());

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

  const uniqueShops = data?.uniqueShops || [];

  // Extract all unique keys from the objects in uniqueShops
  const allKeys = uniqueShops.reduce((keys, obj) => {
    Object.keys(obj).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });
    return keys;
  }, []);
  // console.log("allkeys", allKeys);
  // Generate columns dynamically based on the unique keys
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

  // console.log("data", data);
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
  mappedData = data?.uniqueShops?.map((shop) => ({
    ShopID: shop.ShopID,
    ShopName: shop.ShopName,
  })) || [];
} else {
  mappedData = [];
}

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          borderRadius: "40px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          width: "40vw",
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
          Hello there {name}!
        </Typography>
        <LiveClockUpdate />
        <div
          style={{
            marginTop: "8%",
            marginLeft: "5%",
          }}
        >
          <style>
            {`
              .react-calendar {
                border: none; /* Remove all borders */
                font-family: Arial, sans-serif;
                width: 30vw; /* Adjust the width as needed */
                height: 40vh; /* Adjust the height as needed */
                border-radius: 20px;
              }

              .weekend {
                color: red; /* Saturday and Sunday text color */
              }

              .current-date {
                background-color: blue; /* Blue circle for the current date */
                color: white; /* White text color for the current date */
                border-radius: 50%; /* Make it a circle */
              }
            `}
          </style>
          <Calendar value={date} tileClassName={tileClassName} />
        </div>
      </Box>
      {isLoading ? (
        <CircularWithValueLabel />
      ) : (
        <Box
          sx={{
            borderRadius: "40px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            width: "50vw",
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* Display the total bags and customer token */}
            <Box
              sx={{
                borderRadius: "40px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                width: "17vw",
                padding: "10px",
                marginLeft: "3vw",
                marginTop: "5vh",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {data !== undefined && data !== null || data?.totalBags !== undefined && data?.totalBags !== null
                  ? `Total Baggages: ${data?.totalBags}`
                  : "No baggage to be delivered"}
              </Typography>
            </Box>
            <Box
              sx={{
                borderRadius: "40px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                width: "14vw",
                padding: "10px",
                marginLeft: "3vw",
                marginTop: "5vh",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {data !== undefined && data !== null || data?.customerToken !== undefined && data?.customerToken !== null 
                  ? `Your Token: ${data?.customerToken}`
                  : "No Token to be displayed"}
              </Typography>
            </Box>
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
    </div>
  );
}

export default LuggageBox;
