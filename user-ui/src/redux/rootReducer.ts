// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Assurez-vous de remplacer par le chemin correct de votre authSlice
import { authApi } from '@/hook/authApi';
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  // ajoutez d'autres reducers ici
});

export default rootReducer;