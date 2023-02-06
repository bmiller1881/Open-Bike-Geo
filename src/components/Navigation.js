import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogoutMutation, useGetUsernameQuery } from '../redux/apis/apiSlice';

import { Box, Drawer, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import logo from '../assets/logo.png';
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
  // const [username, setUsername] = useState('test');

  const { data: username = null, isFetching } = useGetUsernameQuery();
  console.log(username, isFetching);
  const [logout, { isLoading }] = useLogoutMutation();

  async function postLogout() {
    await logout();
    // navigate('/login');

    // fetch('/api/user/auth', {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'Application/JSON',
    //   },
    // })
    //   .then((res) => {
    //     if (res.status === 200) navigate('/login');
    //     res.json();
    //   })
    //   .catch((error) => console.log('ERROR: could not delete-fetch: ' + error));
  }

  let drawerWidth;
  if (window.innerWidth < 380) {
    drawerWidth = '11rem';
  } else {
    drawerWidth = '11rem';
  }

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
          {username && (
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
                <LogoutIcon onClick={() => postLogout()} />
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
}

export default Navigation;
