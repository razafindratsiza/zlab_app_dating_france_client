import { LoginSchema } from '@/screens/Login';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginCredentials {
  email: string;
  password: string;
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
      // Simuler une requête API
      console.log(email, password);
      // Simulez la réponse de l'API ici
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);