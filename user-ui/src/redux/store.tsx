// store.ts ou store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Assurez-vous de remplacer par le chemin correct de votre rootReducer
import { authApi } from '@/hook/authApi';
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Export du type de l'état racine
export type RootState = ReturnType<typeof store.getState>;

// Export du type de la fonction dispatch
export type AppDispatch = typeof store.dispatch;

export default store;