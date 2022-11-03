import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

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
      <Header />
      <div className="main-container p-v-200">
        <div className="container flex-col">
          <h2 className="m-sm">SIGN UP</h2>
          <label className="m-sm">
            <strong>username:</strong>
          </label>
          <input className="m-10-left input-4 m-sm" onChange={(event) => setInputUsername(event.target.value)} />
          <br />
          <label className="m-sm">
            <strong>password:</strong>
          </label>
          <input type="password" className="m-10-left input-4 m-sm" onChange={(event) => setInputPassword(event.target.value)} />
          <br />
          <p className="color-warning">
            <em>{authResponse}</em>
          </p>
          <button className="new-button m-sm" onClick={postData}>
            SUBMIT
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
