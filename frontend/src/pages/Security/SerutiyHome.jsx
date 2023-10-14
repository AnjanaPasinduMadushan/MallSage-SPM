import { Box, Button, SpeedDial, SpeedDialAction, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import NavigationIcon from '@mui/icons-material/Navigation';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HistoryIcon from '@mui/icons-material/History';
import FlakyIcon from '@mui/icons-material/Flaky';
import { ToastContainer, toast } from 'react-toastify';
// import { Button } from 'react-bootstrap';
import { validateCustomerID, validateCustomerToken } from '../../Api/services/LuggageService';
function SecurityHome() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [loading, setLoading] = useState('');

  const actions = [
    { icon: <FormatListBulletedIcon />, name: 'Ongoing', target: 'ongoing-section' },
    { icon: <HistoryIcon />, name: 'History', target: 'history-section' },
  ];


  const handleSpeedDialActionClick = (target) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const convertedToken = token.replace(/\s/g, '');

      validateCustomerToken(convertedToken)
        .then(response => {
          toast.success("Token Validated Successfully");
          setToken('');
        })
        .catch(error => {
          if (error.response && error.response.message) {
            toast.error(error.response.message);
          } else {
            toast.error("Token Validation Failed");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.error("An error occurred during token validation");
    } finally {
      setLoading(false);
    }
  }

  const handleForgottenSubmit = (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const convertedToken = customerID.replace(/\s/g, '');

      validateCustomerID(convertedToken)
        .then(response => {
          toast.success("Token Validated Successfully");
          setToken('');
        })
        .catch(error => {
          if (error.response && error.response.message) {
            toast.error(error.response.message);
          } else {
            toast.error("Token Validation Failed");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.error("An error occurred during token validation");
    } finally {
      setLoading(false);
    }
  }

  const handleTokenChange = (event) => {
    const input = event.target.value;

    // Remove any non-alphanumeric characters except spaces
    const sanitizedInput = input.replace(/[^a-zA-Z0-9\s]/g, '');

    // Remove all spaces
    const noSpacesInput = sanitizedInput.replace(/\s/g, '');

    // Add three spaces after each digit or letter
    const formattedToken = noSpacesInput.replace(/(\S)/g, '$1');

    // Limit the input to exactly 4 digits or letters and spaces
    const truncatedToken = formattedToken.slice(0, 92); // Allow for 4 digits/letters and 12 spaces

    setToken(truncatedToken);
  };
  const handleCustomerIDChange = (event) => {
    const input = event.target.value;

    // Remove any non-alphanumeric characters except spaces
    const sanitizedInput = input.replace(/[^a-zA-Z0-9\s]/g, '');

    // Remove all spaces
    const noSpacesInput = sanitizedInput.replace(/\s/g, '');

    // Add three spaces after each digit or letter
    const formattedToken = noSpacesInput.replace(/(\S)/g, '$1');

    // Limit the input to exactly 4 digits or letters and spaces
    const truncatedToken = formattedToken.slice(0, 92); // Allow for 4 digits/letters and 12 spaces

    setCustomerID(truncatedToken);
  };

  return (
    <div style={{ position: 'relative' }}>
      <ToastContainer />
      <div id="ongoing-section">
        <Box
          sx={{
            borderRadius: '40px',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            width: '85%',
            height: '60vh',
            padding: '10px',
            marginLeft: '8vw',
            marginTop: '5vh',
            display: 'flex',
            flexDirection: 'column', // Make it a column layout

          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '30px',
              marginTop: '3vh',
              marginLeft: '2vw',
              marginBottom: '3vh',
            }}
          >
            Pls Enter Customer Token
          </Typography>

          <TextField
            id="outlined-required"
            label="ENTER THE TOKEN"
            style={{
              marginTop: '5%',
              marginLeft: '16%',
              borderRadius: '20px',
              boxShadow: '10px 10px 20px #ccc',
              width: '60vw',
            }}
            InputProps={{
              style: {
                height: '11vh',
                borderRadius: '20px',
                fontSize: '40px',
                backgroundColor: '#ffffff',
              },
              inputProps: {
                maxLength: 92,
              },
            }}
            value={token}
            onChange={handleTokenChange}
          />
          <div
            style={{
              marginLeft: '16%',
            }}
          >
            <Button
              sx={{
                mt: 2,
                borderRadius: '8px',
                width: '20vw',
                height: '8vh',
                marginTop: '5%',
                marginLeft: '25%',
                fontSize: '1.4rem',
                backgroundColor: '#1769aa', 
              }}
              onClick={handleSubmit}
              variant="contained"
              type="submit"
              startIcon={<FlakyIcon />}
            >
              Validate Token
            </Button>
          </div>
        </Box>



      </div>
      <div id="history-section">
        <Box
          sx={{
            borderRadius: '40px',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              width: '85%',
              height: '60vh',
              marginBottom: '5vh',
            padding: '10px',
            marginLeft: '8vw',
            marginTop: '5vh',
            display: 'flex',
            flexDirection: 'column', // Make it a column layout

          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '30px',
              marginTop: '3vh',
              marginLeft: '2vw',
              marginBottom: '3vh',
            }}
          >
            Pls Enter Customer ID (Forgotten Lugagges)
          </Typography>

          <TextField
            id="outlined-required"
            label="ENTER THE Customer ID"
            style={{
              marginTop: '5%',
              marginLeft: '16%',
              borderRadius: '20px',
              boxShadow: '10px 10px 20px #ccc',
              width: '60vw',
            }}
            InputProps={{
              style: {
                height: '11vh',
                borderRadius: '20px',
                fontSize: '40px',
                backgroundColor: '#ffffff',
              },
              inputProps: {
                maxLength: 92,
              },
            }}
            value={customerID}
            onChange={handleCustomerIDChange}
          />
          <div
            style={{
              marginLeft: '16%',
            }}
          >
            <Button
              sx={{
                mt: 2,
                borderRadius: '8px',
                width: '20vw',
                marginLeft: '25%',
                height: '8vh',
                marginTop: '5%',
                fontSize: '1.4rem',
                backgroundColor: '#1769aa',
              }}
              onClick={handleForgottenSubmit}
              variant="contained"
              type="submit"
              startIcon={<FlakyIcon />}
            >
              Validate Customer ID
            </Button>
          </div>
        </Box>



      </div>
      {/* <div id="history-section">
        <Box
          sx={{
            borderRadius: '40px',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            width: '94%',
            height: '80vh',
            padding: '10px',
            marginLeft: '3vw',
            marginTop: '5vh',
            display: 'flex',
            flexDirection: 'column', // Make it a column layout

          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '30px',
              marginTop: '3vh',
              marginLeft: '2vw',
              marginBottom: '3vh',
            }}
          >
            Pls Enter Customer ID (Forgottend Lugagges)
          </Typography>

          <TextField
            id="outlined-required"
            label="ENTER THE Customer ID"
            style={{
              marginTop: '5%',
              marginLeft: '16%',
              borderRadius: '20px',
              boxShadow: '10px 10px 20px #ccc',
              width: '60vw',
            }}
            InputProps={{
              style: {
                height: '11vh',
                borderRadius: '20px',
                fontSize: '40px',
                backgroundColor: '#ffffff',
              },
              inputProps: {
                maxLength: 92,
              },
            }}
            value={customerID}
            onChange={handleCustomerIDChange}
          />
          <div
            style={{
              marginLeft: '16%',
            }}
          >
            <Button
              sx={{
                mt: 2,
                borderRadius: '8px',
                width: '20vw',
                height: '8vh',
                marginTop: '5%',
                fontSize: '1.4rem',
                backgroundColor: '#1769aa',
              }}
              onClick={handleForgottenSubmit}
              variant="contained"
              type="submit"
              startIcon={<FlakyIcon />}
            >
              Validate Customer ID
            </Button>
          </div>
        </Box>



      </div> */}
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
    </div>
  );

}

export default SecurityHome