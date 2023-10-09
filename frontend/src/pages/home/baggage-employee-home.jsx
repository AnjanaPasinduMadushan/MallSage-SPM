import { Box, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';

function BaggageEmployeeHome() {
    const isLoggedusername = useSelector((state) => state.auth.User.name);
    return (
        <div
        style={{
            display:"flex",
            flexDirection:"row",
            flexWrap:"wrap",
            // justifyContent:"center",
        }}
        >
            <div>
          <Box
            sx={{
                width: "20vw",
                height: "4vh",
                marginLeft: "2%",
                marginTop:"2%",
                borderRadius: "20px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
           <Typography
           sx={{
            marginLeft:"10%",
            marginTop:"10%",
            justifyContent:"center",
            fontWeight:"bold"
           }}
           >Welcome {isLoggedusername}!</Typography> 
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
          <div>
          <Box
            sx={{
                width: "35vw",
                height: "75vh",
                marginLeft: "10%",
                marginTop:"14.5%",
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
              >Completed Task Today!</Typography>
          </Box>

          </div>
        </div>
      );
      
}

export default BaggageEmployeeHome;
