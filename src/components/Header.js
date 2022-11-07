import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [headerOptions, setHeaderOptions] = useState();

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
        if (data === 'not logged in') {
          setHeaderOptions(
            <>
              <a
                className={location.pathname === '/login' || location.pathname === '/login/' ? 'm-sm hover' : 'm-sm hover icon-opacity'}
                href="login"
              >
                <strong className="hover">
                  <em>Login</em>
                </strong>
              </a>
            </>
          );
        } else {
          setHeaderOptions(
            <>
              {' '}
              <p className="m-sm hover icon-opacity">
                <strong>{data}</strong>
              </p>
              <a className="m-sm hover icon-opacity" onClick={postLogout}>
                <strong>
                  <em>Logout</em>
                </strong>
              </a>
            </>
          );
        }
      })
      .catch((error) => console.log('ERROR: could not get-fetch: ' + error));
  }

  return (
    <header>
      <div>
        <nav>
          <div>
            <img className="logo-main" src={logo} alt="logo"></img>
            <h2>OPEN BIKE GEO</h2>
          </div>
          <div>
            <a className={location.pathname === '/' ? 'm-sm' : 'm-sm icon-opacity'} href="/">
              <svg className="logo-secondary hover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M211.2 96c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64zM32 256c0 17.7 14.3 32 32 32h85.6c10.1-39.4 38.6-71.5 75.8-86.6c-9.7-6-21.2-9.4-33.4-9.4H96c-35.3 0-64 28.7-64 64zm461.6 32H576c17.7 0 32-14.3 32-32c0-35.3-28.7-64-64-64H448c-11.7 0-22.7 3.1-32.1 8.6c38.1 14.8 67.4 47.3 77.7 87.4zM391.2 226.4c-6.9-1.6-14.2-2.4-21.6-2.4h-96c-8.5 0-16.7 1.1-24.5 3.1c-30.8 8.1-55.6 31.1-66.1 60.9c-3.5 10-5.5 20.8-5.5 32c0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32c0-11.2-1.9-22-5.5-32c-10.8-30.7-36.8-54.2-68.9-61.6zM563.2 96c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64zM321.6 192c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80zM32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z" />
              </svg>
            </a>
            <a className={location.pathname === '/user' || location.pathname === '/user/' ? 'm-sm' : 'm-sm icon-opacity'} href="/user">
              <svg className="logo-secondary hover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M400 96c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm27.2 64l-61.8-48.8c-17.3-13.6-41.7-13.8-59.1-.3l-83.1 64.2c-30.7 23.8-28.5 70.8 4.3 91.6L288 305.1V416c0 17.7 14.3 32 32 32s32-14.3 32-32V288c0-10.7-5.3-20.7-14.2-26.6L295 232.9l60.3-48.5L396 217c5.7 4.5 12.7 7 20 7h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H427.2zM200 384c0 39.8-32.2 72-72 72s-72-32.2-72-72s32.2-72 72-72s72 32.2 72 72zm56 0c0-70.7-57.3-128-128-128S0 313.3 0 384s57.3 128 128 128s128-57.3 128-128zm328 0c0 39.8-32.2 72-72 72s-72-32.2-72-72s32.2-72 72-72s72 32.2 72 72zm56 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z" />
              </svg>
            </a>
            {headerOptions}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
