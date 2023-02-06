import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Log'],
  endpoints: (builder) => ({
    getUsername: builder.query({
      query: () => '/user/auth',
      providesTags: ['Log'],
    }),
    getUserData: builder.query({
      query: () => '/user',
      providesTags: ['Log'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/user/auth',
        method: 'DELETE',
      }),
      invalidatesTags: ['Log'],
    }),
  }),
});

export const { useGetUsernameQuery, useGetUserDataQuery, useLogoutMutation } = apiSlice;

// function postLogout() {
//   fetch('/api/user/auth', {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'Application/JSON',
//     },
//   })
//     .then((res) => {
//       if (res.status === 200) navigate('/login');
//       res.json();
//     })
//     .catch((error) => console.log('ERROR: could not delete-fetch: ' + error));
// }
