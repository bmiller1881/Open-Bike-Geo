import React from 'react';
import Navigation from '../components/Navigation';
import UserFeed from '../components/UserFeed';
import Footer from '../components/Footer';
import WorkArea from '../components/WorkArea';

function User(props) {
  return (
    <>
      <Navigation />
      <WorkArea>
        <UserFeed />
      </WorkArea>
    </>
  );
}

export default User;
