import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import User from './pages/User';
import Public from './pages/Public';
import Login from './pages/Login';
import Signup from './pages/Signup';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(204, 85, 0)',
    },
    secondary: {
      main: '#134e00',
    },
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
  },
});

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Public /> },
    { path: '/user', element: <User /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
  ]);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
