import { LoginSchema } from '@/screens/Login';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
interface LoginCredentials {
  email: string;
  password: string;
}


interface User {
  fullname: string;
  id: string;
  username: string;
}

interface LoginResponse {
  data: {
    Login: {
      user: User;
      accessToken: string;
      refreshToken: string;
      error?: {
        message: string;
      };
    };
  };
}

export const userLogin = createAsyncThunk<
  void, // Type de retour en cas de succès
  LoginSchema, // Type des paramètres
  {
    rejectValue: string // Type de retour en cas d'erreur
  }
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              Login(email: "${email}", password: "${password}") {
                user {
                  fullname
      id,
      username,
      email,
      birthDay
      birthYear,
      birthMonth
                }
                accessToken
                refreshToken
                error {
                  message
                }
              }
            }
          `,
        }),
      });

      const result: LoginResponse = await response.json();

      if (result.data.Login.error) {
        toast.error(result.data.Login.error.message)
      }

      Cookies.set('access_token', result.data.Login.accessToken)
      Cookies.set('refresh_token', result.data.Login.refreshToken)


    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);