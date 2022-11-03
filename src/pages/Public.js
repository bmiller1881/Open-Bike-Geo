import React from 'react';
import Header from '../components/Header';
import PublicFeed from '../components/PublicFeed';
import Footer from '../components/Footer';

function Public(props) {
  return (
    <>
      <Header></Header>
      <PublicFeed />
      <Footer></Footer>
    </>
  );
}

export default Public;
