import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

function Navigation(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [headerOptions, setHeaderOptions] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('test');

  useEffect(() => {
    getUser();
  }, []);

  function postLogout() {
    fetch('/api/user/auth', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON',
      },
    })
      .then((res) => {
        if (res.status === 200) navigate('/login');
        res.json();
      })
      .catch((error) => console.log('ERROR: could not delete-fetch: ' + error));
  }

  function getUser() {
    fetch('/api/user/auth')
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'not logged in') setIsLoggedIn(true);
        // if (data === 'not logged in') {
        //   setHeaderOptions(
        //     <>
        //       <a className={pathname === '/login' || pathname === '/login/' ? 'm-sm hover' : 'm-sm hover icon-opacity'} href="login">
        //         <strong className="hover">
        //           <em>Login</em>
        //         </strong>
        //       </a>
        //     </>
        //   );
        // } else {
        //   setHeaderOptions(
        //     <>
        //       {' '}
        //       <p className="m-sm hover icon-opacity">
        //         <strong>{data}</strong>
        //       </p>
        //       <a className="m-sm hover icon-opacity" onClick={postLogout}>
        //         <strong>
        //           <em>Logout</em>
        //         </strong>
        //       </a>
        //     </>
        //   );
        // }
      })
      .catch((error) => console.log('ERROR: could not get-fetch: ' + error));
  }

  if (window.innerWidth < 380) {
    const drawerWidth = '11rem';

    return (
      <nav>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth})`,
            ml: drawerWidth,
            height: '4rem',
          }}
        >
          <Toolbar>
            <Box
              component="img"
              sx={{
                mx: '1.5rem',
                height: 30,
                filter: 'grayscale(1) invert(1)',
              }}
              alt="dbHive icon"
              src={logo}
            />
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              OPEN BIKE GEO
            </Typography>
            {isLoggedIn && (
              <>
                <Box sx={{ display: 'flex', ml: 'auto', mr: '1rem' }}>
                  <AccountCircleIcon />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      opacity: '70%',
                      fontSize: '1rem',
                      ml: '.5rem',
                      mr: '2rem',
                    }}
                  >
                    {username}
                  </Typography>
                  <LogoutIcon
                    onClick={() => {
                      logOutUser();
                      navigate('/login');
                    }}
                  />
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar></Toolbar>
          <Divider />
          <List>
            <ListItem disablePadding selected={pathname === '/login/' || pathname === '/login'}>
              <ListItemButton onClick={() => navigate('/login')}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding selected={pathname === '/signup/' || pathname === '/signup'}>
              <ListItemButton onClick={() => navigate('/signup')}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding selected={pathname === '/user/' || pathname === '/user'}>
              <ListItemButton onClick={() => navigate('/user')}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding selected={pathname === '/'}>
              <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                  <RecentActorsIcon />
                </ListItemIcon>
                <ListItemText primary="Feed" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </nav>
    );
  } else {
    const drawerWidth = '11rem';
    return (
      <nav>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth})`,
            ml: drawerWidth,
            height: '4rem',
          }}
        >
          <Toolbar>
            <Box
              component="img"
              sx={{
                mx: '1.5rem',
                height: 30,
                filter: 'grayscale(1) invert(1)',
              }}
              alt="dbHive icon"
              src={logo}
            />
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              OPEN BIKE GEO
            </Typography>
            {isLoggedIn && (
              <>
                <Box sx={{ display: 'flex', ml: 'auto', mr: '1rem' }}>
                  <AccountCircleIcon />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      opacity: '70%',
                      fontSize: '1rem',
                      ml: '.5rem',
                      mr: '2rem',
                    }}
                  >
                    {username}
                  </Typography>
                  <LogoutIcon onClick={postLogout} />
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar></Toolbar>
          <Divider />
          <List>
            <ListItem disablePadding selected={pathname === '/login/' || pathname === '/login'}>
              <ListItemButton onClick={() => navigate('/login')}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding selected={pathname === '/signup/' || pathname === '/signup'}>
              <ListItemButton onClick={() => navigate('/signup')}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding selected={pathname === '/user/' || pathname === '/user'}>
              <ListItemButton onClick={() => navigate('/user')}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding selected={pathname === '/'}>
              <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                  <RecentActorsIcon />
                </ListItemIcon>
                <ListItemText primary="Feed" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <ListItem sx={{ position: 'absolute', bottom: '6px', color: 'grey' }}>
            <ListItemText>
              <Typography sx={{ fontSize: '10px', mb: '.5rem' }}>
                <Typography component="span" sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                  Designed By
                </Typography>{' '}
                Brandon Miller
              </Typography>
              <Typography sx={{ fontSize: '10px', mb: '.5rem' }}>
                <Typography component="span" sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                  References
                </Typography>{' '}
                Model of a Bicycle from Handling Qualities Considerations: Davol, Owen, Fabijanic
              </Typography>
              <Typography sx={{ fontSize: '10px' }}>
                <Typography component="span" sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                  Version
                </Typography>{' '}
                V2.0 2023
              </Typography>
            </ListItemText>
          </ListItem>
        </Drawer>
      </nav>
    );
  }
}

export default Navigation;
