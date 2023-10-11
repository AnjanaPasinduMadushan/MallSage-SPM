import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import FlakyIcon from '@mui/icons-material/Flaky';
import { ToastContainer, toast } from 'react-toastify';
import { Blocks } from  'react-loader-spinner'
import { validateToken } from '../../Api/services/LuggageService';

function VerifyToken() {

    const [token, setToken] = useState('');
    const [loading, setLoading] = useState('');
console.log("loading", loading)
const handleSubmit = (event) => {
    try {
        setLoading(true);
        event.preventDefault();
        const convertedToken = token.replace(/\s/g, '');
        
        validateToken(convertedToken)
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
            const formattedToken = noSpacesInput.replace(/(\S)/g, '$1                       ');

            // Limit the input to exactly 4 digits or letters and spaces
            const truncatedToken = formattedToken.slice(0, 92); // Allow for 4 digits/letters and 12 spaces

            setToken(truncatedToken);
        };
        return (
            <div>
                <ToastContainer/>
    {loading ? (
  <Blocks
    visible={true}
    marginLeft="8%"
    marginTop="6%"
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
  />
) : (
  <>
    <Typography
      style={{
        marginTop: '6%',
        marginLeft: '8%',
        fontSize: '40px',
      }}
    >
      TOKEN VALIDATION
    </Typography>

    <TextField
      id="outlined-required"
      label="ENTER THE TOKEN"
      style={{
        marginTop: '4%',
        borderRadius: '8px',
        boxShadow: '10px 10px 20px #ccc',
        marginLeft: '23%',
        width: '60vw',
        boxSizing: 'border-box',
      }}
      InputProps={{
        style: {
          height: '11vh',
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
    <Button
      sx={{
        mt: 2,
        borderRadius: '8px', // Make this consistent with other borderRadius values
        width: '20vw',
        marginLeft: '41%',
        marginTop: '8%',
        height: '8vh',
        fontSize: '1.4rem',
        backgroundColor: '#1769aa', // Move backgroundColor here
      }}
      onClick={handleSubmit}
      variant="contained"
      type="submit"
      startIcon={<FlakyIcon />}
    >
      Validate Token
    </Button>
  </>
)}
            </div>
          );
        }
    
        export default VerifyToken;