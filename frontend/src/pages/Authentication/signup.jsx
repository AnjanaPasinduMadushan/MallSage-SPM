import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Copyright from '../../components/copyright';

<Copyright />

const defaultTheme = createTheme();

export default function SignUp() {

  const [inputs, setInputs] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    role: "",
  })

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setInputs((previousState) => ({
      ...previousState,
      [name]: value
    }))
  }

  const sendData = async () => {

    try {
      const res = await axios.post("http://localhost:5000/user/signup", {
        name: inputs.name,
        mobile: inputs.mobile,
        email: inputs.email,
        role: inputs.role,
        password: inputs.password
      })

      const data = await res.data;
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `${JSON.stringify(data.message)}`,
      })
      return data;
    } catch (err) {
      console.log(err)
      if (err.response) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${JSON.stringify(err.response.data.message)}`,
        });
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err.message);
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      sendData();
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={15}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={inputs.name}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={15}>
                <TextField
                  autoComplete="given-mobile"
                  name="mobile"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  value={inputs.mobile}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={inputs.email}
                  onChange={handleChange}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={15}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="role"
                    value={inputs.role}
                    onChange={handleChange}
                    name="role"
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  value={inputs.password}
                  onChange={handleChange}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}