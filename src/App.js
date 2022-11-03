import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import User from './pages/User';
import Public from './pages/Public';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Public /> },
    { path: '/user', element: <User /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
