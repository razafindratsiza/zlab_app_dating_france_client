import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { gql } from '@apollo/client';
import GqlClient from '@/graphql/GqlClient'
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URI;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = 'access_token';

      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({
        url: baseUrl, // Définissez l'URL de votre endpoint GraphQL ici si nécessaire
        method: 'POST',
        body: {
          query: `
            query {
              getLoggedInUser {
                user {
                  id
                  fullname
                  username
                  email
                  birthDay
                  sex
                  birthMonth
                  birthYear
                }
                accessToken
                refreshToken
                error {
                  message
                }
              }
            }
          `,
        },
      }),
    }),
  }),
});

/**
 const graphqlBaseQuery = (): BaseQueryFn => async ({ body }) => {
   try {
     const result = await GqlClient.mutate({
       mutation: gql(body.query),
       variables: body.variables,
     });
 
     if (result.errors) {
       return { error: result.errors[0].message };
     }
 
     return { data: result.data };
   } catch (error: any) {
     return { error: error.message };
   }
 };
 
 export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: graphqlBaseQuery(),
   endpoints: (build) => ({
     getUserDetails: build.query({
       query: () => ({
         query: `
         query{
           getLoggedInUser{
             user{
               id
               fullname
               username
               email
               birthDay
               sex
               birthMonth
               birthYear
             }
             accessToken
             refreshToken
             error{
               message
             }
           }
         }
         `,
         variables: {},
       }),
     }),
   }),
 });
 * 
 */

// export react hook
export const { useGetUserDetailsQuery } = authApi