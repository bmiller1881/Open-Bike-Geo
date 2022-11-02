import React from 'react';
import logo from '../assets/logo.png';

function Header(props) {
  return (
    <header>
      <nav>
        <img className="logo-main" src={logo} alt="logo"></img>
        <h2>OPEN BIKE GEO</h2>
      </nav>
    </header>
  );
}

export default Header;
