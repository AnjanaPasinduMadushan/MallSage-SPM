import LocalMallIcon from '@mui/icons-material/LocalMall';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { autheticationActions } from '../store';
import { useNavigate } from 'react-router-dom';
// import authSlice from '../../Redux/auth/authSlice';
import { signOutAction } from '../../Redux/auth/authAction';
axios.defaults.withCredentials = true;

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Logout'];
const auth = ['Login', 'Sign Up'];

function Header() {

  const navigate = useNavigate();


  const dispatch = useDispatch();
  const isLoggedrole = useSelector((state) => state.auth.User.role);
  // const sendLogoutReq = async () => {
  //   const res = await axios.post("http://localhost:5000/User/logout", null, {
  //     withCredentials: true,
  //   }); //null means we don't have anything to add with this api
  //   if (res.status === 200) {
  //     return res;
  //   }
  //   return new Error("Unable To Logout. Please try again");
  // };
  const handleLogout = async (setting) => {
    console.log(setting)
    if (setting === settings[0]) {
      alert("go to profile")
    } else if (setting === settings[1]) {
      await dispatch(signOutAction())
        .then(() => navigate("/signIn"));
    } else {
      alert("Pagr is not found")
    }
  };

  const navigateButton = (auths) => {
    console.log(auths)
    if (auths === auth[0]) {
      navigate('/signIn')
    }
    if (auths === auth[1]) {
      navigate('/signUp')
    }
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const navigateToPage = (page) => {
  //   switch (page) {
  //     case pages[2]:
  //       navigate('./allShopBlogs');
  //       break;
  //   }
  // }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <LocalMallIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MALL-SAGE
            {isLoggedrole ? " | Customer" : ""}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" ><div onClick={() =>{}/* navigateToPage(page)*/}>{page}</div></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalMallIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MALL-SAGE
            {isLoggedrole ? " | Customer" : ""}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <div onClick={() =>{}/* navigateToPage(page)*/}>{page}</div>
              </Button>
            ))}
          </Box>

          {isLoggedrole ? (<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleLogout(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              {auth.map((auth) => (
                <Button
                  key={auth}
                  onClick={() => navigateButton(auth)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {auth}
                </Button>
              ))}
            </Box>)}
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default Header;