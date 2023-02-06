import React from 'react';
import { useGetUsernameQuery } from '../redux/apis/apiSlice';
import { useNavigate } from 'react-router-dom';

import Navigation from '../components/Navigation';
import UserFeed from '../components/UserFeed';
import WorkArea from '../components/WorkArea';

function User(props) {
  const navigate = useNavigate();
  const { data: username, isLoading, isFetching, isSuccess, isError, error } = useGetUsernameQuery();
  if (!username) navigate('/login');
  console.log('username', username);

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
