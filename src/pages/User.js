import React from 'react';
import Header from '../components/Header';
import UserFeed from '../components/UserFeed';
import Footer from '../components/Footer';

function User(props) {
  return (
    <>
      <Header></Header>
      <UserFeed />
      <Footer></Footer>
    </>
  );
}

export default User;
