import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import NavigationIcon from '@mui/icons-material/Navigation';
import ShareIcon from '@mui/icons-material/Share';
import { getLuggagesByBaggage, getLuggagesHistoryByBaggage } from '../../Api/services/LuggageService';
import { useSelector } from "react-redux";
import { useQuery } from 'react-query';
import MaterialReactTable from 'material-react-table';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Modal } from 'react-bootstrap';
import HistoryIcon from '@mui/icons-material/History';
function BaggageEmployeeHome() {

  const userid = useSelector((state) => state.auth.User._id);
  const isLoggedusername = useSelector((state) => state.auth.User.name);
  const [showshopTokeModal, setShowshopTokeModal] = useState(false);
  const [shopToken, setShopToken] = useState(null);
  const handleShowShopTokenModal = () => setShowshopTokeModal(true);
  const handleCloseShopTokenModal = () => setShowshopTokeModal(false);
  const [open, setOpen] = useState(false);
  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getLuggagesByBaggage(userid),
  });

  const { data: historydata, isLoading: historyloading, error: historyerror, isError: historyisError } = useQuery({
    queryFn: () => getLuggagesHistoryByBaggage(userid),
  });

  const columns = [
    {
      header: "ShopName",
      accessorKey: "ShopName",
    },
    {
      header: "Delivered By",
      accessorKey: "RequestedDeliveryTime",
    },
    {
      header: "Available Time",
      accessorKey: "timeDuration",
    },
    {
      header: "View Shop Token",
      accessorKey: "ViewButton",
      cellRenderer: (rowData) => rowData.ViewButton,
    }
  ];

  const columns2 = [
    {
      header: "ShopName",
      accessorKey: "ShopName",
    },
    {
      header: "luggage Id",
      accessorKey: "luggageID",
    },
    {
      header: "Time Duration",
      accessorKey: "TimeDuration",
    },
    {
      header: "Completed Date",
      accessorKey: "RequestedDeliveryDate",
    },

  ];

  const handleShopTokenModalView = (ShopToken) => {
    console.log("ShopToken", ShopToken);
    setShopToken(ShopToken);
    handleShowShopTokenModal();
  }

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };


  let mappedData2 = [];

  if (data !== undefined) {
    mappedData2 = historydata?.luggages?.map((shop) => {


      const date = new Date(shop.RequestedDeliveryDate);

      // Get the year, month, and date components
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month since it's 0-indexed
      const day = date.getDate().toString().padStart(2, '0');


      const row = {
        ShopName: shop.ShopName,
        luggageID: shop.luggageID,
        TimeDuration: shop.TimeDuration,
        RequestedDeliveryDate: `${year}-${month}-${day}`,
      };




      return row;
    }) || [];
  }



  let mappedData = [];

  if (data !== undefined) {
    mappedData = data?.uniqueShops?.map((shop) => {
      const originalTime = new Date(shop.RequestedDeliveryTime);
      const currentDateTime = new Date();
      const hours = originalTime.getHours();
      const minutes = originalTime.getMinutes();
      const amOrPm = hours >= 12 ? "PM" : "AM";

      // Convert hours to 12-hour format
      const formattedHours = hours % 12 || 12;

      const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
      originalTime.setMinutes(originalTime.getMinutes() - 5);

      // Calculate the time duration in hours
      const timeDurationInMilliseconds = originalTime - currentDateTime;
      const timeDurationInHours = timeDurationInMilliseconds / (1000 * 60 * 60);

      const row = {
        ShopName: shop.ShopName,
        RequestedDeliveryTime: formattedTime,
        timeDuration: timeDurationInHours.toFixed(2) + "h",

      };

      // Add a button to the row data
      row.ViewButton = (
        <Button
          sx={{
            mt: 2,
            borderRadius: '18px', // Make this consistent with other borderRadius values
            // width: '20vw',
            // marginLeft: '3%',
            color: 'white',
            // marginTop: '2.7%',
            // height: '4vh',
            fontSize: '1.0rem',
            backgroundColor: '#1769aa', // Move backgroundColor here
          }}
          onClick={() => handleShopTokenModalView(shop.ShopToken)}
        >
          View
        </Button>

      );



      return row;
    }) || [];
  }

  const actions = [
    { icon: <FormatListBulletedIcon />, name: 'Ongoing', target: 'ongoing-section' },
    { icon: <HistoryIcon />, name: 'History', target: 'history-section' },
  ];


  const handleSpeedDialActionClick = (target) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div id="ongoing-section">
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                marginTop: "3vh",
                marginLeft: "2vw",
                marginBottom: "3vh",
              }}
            >
              Ongoing Tasks for {isLoggedusername}
            </Typography>
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
          </div>
          <div
            style={{ width: '90%', marginLeft: '4%', marginTop: '10%' }}
          >
            <MaterialReactTable
              columns={columns}
              data={mappedData}

            />
          </div>

        </Box>


      </div>
      <div id="history-section">
        <Box
          sx={{
            borderRadius: "40px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            width: "94%",
            height: "80vh",
            padding: "10px",
            marginLeft: "3vw",
            marginTop: "7vh",
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                marginTop: "3vh",
                marginLeft: "2vw",
                marginBottom: "3vh",
              }}
            >
              History of {isLoggedusername}
            </Typography>
          </div>
          <div
            style={{ width: '90%', marginLeft: '4%', marginTop: '10%' }}
          >
            <MaterialReactTable
              columns={columns2}
              data={mappedData2}

            />
          </div>

        </Box>

      </div>
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 999,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 30, right: 30 }}
          icon={<NavigationIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleSpeedDialActionClick(action.target)}
            />
          )
          )}

        </SpeedDial>
      </div>

      {/*Modal For Shop Token */}
      <Modal
        show={showshopTokeModal}
        onHide={handleCloseShopTokenModal}
        style={{ marginTop: "8%" }}
      >
        <Modal.Header closeButton>Your Token </Modal.Header>

        <Modal.Body style={{ textAlign: 'center' }}>
          {data
            ? `Your Token: ${shopToken || "N/A"}`
            : "No Token to be displayed"}

        </Modal.Body>
      </Modal>
    </div>
  );

}

export default BaggageEmployeeHome;
