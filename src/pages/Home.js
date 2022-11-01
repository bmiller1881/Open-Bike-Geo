import React from 'react';
import Header from '../components/Header';
import Feed from '../components/Feed';
import Footer from '../components/Footer';

function Home(props) {
  return (
    <>
      <Header></Header>
      <Feed />
      <Footer></Footer>
    </>
  );
}

export default Home;
