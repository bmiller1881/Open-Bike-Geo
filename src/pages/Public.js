import React from 'react';
import Navigation from '../components/Navigation';
import PublicFeed from '../components/PublicFeed';
import Footer from '../components/Footer';
import WorkArea from '../components/WorkArea';

function Public(props) {
  return (
    <>
      <Navigation />
      <WorkArea>
        <PublicFeed />
      </WorkArea>
    </>
  );
}

export default Public;
