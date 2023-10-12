import { Box, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

function BaggageEmployeeHome() {
  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];
    const isLoggedusername = useSelector((state) => state.auth.User.name);
    return (
        <div >
            <div>
          <Box
            sx={{
                width: "60vw",
                height: "75vh",
                marginLeft: "2%",
                marginTop:"2%",
                borderRadius: "20px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
              <Typography
              sx={{
                marginLeft:"10%",
                // marginTop:"10%",
                justifyContent:"center",
                fontWeight:"bold"
              }}
              >Todays Task!</Typography>
          </Box>
          <Box
            sx={{
                width: "60vw",
                height: "75vh",
                marginLeft: "2%",
                marginTop:"2%",
                borderRadius: "20px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
              <Typography
              sx={{
                marginLeft:"10%",
                // marginTop:"10%",
                justifyContent:"center",
                fontWeight:"bold"
              }}
              >Todays Task!</Typography>
          </Box>
          </div>
          <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />}>
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </div>
        </div>
      );
      
}

export default BaggageEmployeeHome;
