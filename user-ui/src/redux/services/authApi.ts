import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'; // Assurez-vous de remplacer par le chemin correct de votre store

// Définir le type de la réponse de l'API
interface UserInfo {
  fullname: string;
  username: string;
  id: string;
  bio: string;
  avatarList: {
    x56: string;
    x26: string;
  };
  email: string;
}

interface UserInfoResponse {
  data: {
    userInfo: UserInfo;
  };
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userToken;

      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), // Set the base URL of your GraphQL endpoint

  endpoints: (build) => ({
    getUserDetails: build.query<UserInfoResponse, void>({
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          query: `
          query {
            userInfo {
              fullname
              username
              id
              bio
              avatarList {
                x56
                x26
              }
              email
            }
          }
          `,
        },
      }),
    }),
  }),
});

// Exporter le hook react
export const { useGetUserDetailsQuery } = authApi;