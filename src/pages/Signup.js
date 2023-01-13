import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography, Card, Button } from '@mui/material';

import Navigation from '../components/Navigation';
import WorkArea from '../components/WorkArea';

function Signup(props) {
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [authResponse, setAuthResponse] = useState('');

  function postData() {
    // flashes auth response if still incorrect
    setAuthResponse('');
    if (inputUsername === '' || inputPassword === '') return;
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ username: inputUsername, password: inputPassword }),
    })
      .then((res) => {
        if (res.status === 409) setAuthResponse('username already taken');
        else if (res.status === 200) {
          navigate('/user');
        }
        return res.json();
      })
      .catch((error) => console.log('ERROR: could not post-fetch: ' + error));
  }

  return (
    <>
      <Navigation />
      <WorkArea>
        <Box sx={{ m: '2rem' }}>
          <Card
            sx={{
              textAlign: 'center',
              width: 400,
              mx: 'auto',
              p: '4rem',
            }}
          >
            <Typography variant="h5" data-testid="login-header" component="div" sx={{ flexGrow: 1, mb: '2rem' }}>
              SIGN UP
            </Typography>
            <TextField label="username" variant="filled" sx={{ width: '100%' }} onChange={(event) => setInputUsername(event.target.value)} />
            <br />
            <TextField label="password" variant="filled" type="password" sx={{ width: '100%' }} className="m-10-left input-4 m-sm" onChange={(event) => setInputPassword(event.target.value)} />
            <br />
            <p className="color-warning">
              <em>{authResponse}</em>
            </p>
            <Button variant="contained" sx={{ width: '100%' }} onClick={postData}>
              SUBMIT
            </Button>
            <Button variant="text" sx={{ width: '100%' }} onClick={() => navigate('/login')}>
              Login
            </Button>
          </Card>
        </Box>
      </WorkArea>
    </>
  );
}

export default Signup;
