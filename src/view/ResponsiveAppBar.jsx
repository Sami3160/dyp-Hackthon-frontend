import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const pages = ['Events', 'Login', 'Signin'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const navigate = useNavigate()
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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <img className='h-4 md:h-10 w-4 md:w-10 hidden md:block' src='https://img.icons8.com/?size=100&id=2QDhXdmrmfgU&format=png&color=000000' />
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
            WebManage
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >


              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }} onClick={() => navigate("/events")}>Event</Typography>
              </MenuItem>
              {
                localStorage.getItem('token')?.length <= 0 && (

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }} onClick={() => navigate("/signin")}>Signin</Typography>
                  </MenuItem>
                )
              }
              {
                localStorage.getItem('token')?.length <= 0 && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }} onClick={() => navigate("/login")}>Login</Typography>
                  </MenuItem>
                )
              }
              {
                localStorage.getItem('token')?.length > 0 && (
                  <Box>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography sx={{ textAlign: 'center' }} onClick={() => {
                        navigate("/login")
                        localStorage.setItem('token', '')
                        localStorage.setItem('role', '')

                      }}>Logout</Typography>
                    </MenuItem>

                  </Box>
                )
              }
              {console.log(localStorage.getItem('token'))}

            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <img className='h-4 md:h-10 w-4 md:w-10 block md:hidden' src='https://img.icons8.com/?size=100&id=2QDhXdmrmfgU&format=png&color=000000' />

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
            WebManage
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => navigate("/events")}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Event
            </Button>
            {
              (localStorage.getItem('token')?.length > 0 && localStorage.getItem('role') == "admin") && (
                <Button
                  onClick={() => navigate("/dashboard")}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Dashboard
                </Button>
              )
            }
            {
              localStorage.getItem('token')?.length > 0 && (
                <Button
                  onClick={() => {
                    navigate("/")
                    localStorage.setItem('token', '')
                    localStorage.setItem('role', '')
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Logout
                </Button>
              )
            }

            {
              localStorage.getItem('token')?.length <= 0 && (

                <Button
                  onClick={() => navigate("/signup")}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Signin
                </Button>
              )
            }
            {
              localStorage.getItem('token')?.length <= 0 && (
                <Button
                  onClick={() => navigate("/login")}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Login
                </Button>

              )
            }

          </Box>
          {
            localStorage.getItem('token')?.length > 0 && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User1" src="/static/images/avatar/2.jpg" />
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


                  <MenuItem onClick={handleCloseUserMenu}
                  >
                    <Typography sx={{ textAlign: 'center' }} onClick={() => navigate("/dashboard")}>Dashboard</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}
                  >
                    <Typography sx={{ textAlign: 'center' }} onClick={

                      () => {
                        navigate("/logout")

                        localStorage.setItem('token', '')
                        localStorage.setItem('role', '')
                      }
                    }>Logout</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}
                  >
                    <Button sx={{ textAlign: 'center' }} onClick={() => navigate("/events")}>Events</Button>
                  </MenuItem>
                </Menu>
              </Box>
            )
          }

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;