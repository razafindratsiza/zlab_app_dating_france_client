// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Assurez-vous de remplacer par le chemin correct de votre authSlice

const rootReducer = combineReducers({
  auth: authReducer,
  // ajoutez d'autres reducers ici
});

export default rootReducer;