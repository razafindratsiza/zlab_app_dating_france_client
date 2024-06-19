import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userLogin } from './authActions';

// Définir les types pour l'état initial
interface AuthState {
  loading: boolean;
  userInfo: UserInfo | null;
  userToken: string | null;
  error: string | null;
  success: boolean;
  websocket: WebSocket | null;
}

// Définir les types pour l'information utilisateur
interface UserInfo {
  id: string;
  email: string;
  // Ajouter d'autres champs nécessaires
}

// Récupérer le token depuis le session storage
const token = null
const userToken: string | null = token;

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  websocket: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem('auth'); // Supprimer le token du stockage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setWebsocket: (state, action: PayloadAction<WebSocket>) => {
      state.websocket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials, setWebsocket } = authSlice.actions;

export default authSlice.reducer;