import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "reduxjs-toolkit-persist";

import localStorage from 'redux-persist/lib/storage'
import { encryptTransform } from "redux-persist-transform-encrypt";

import authReducer, { AuthState } from "./slices/auth.slice";

const encryptor = encryptTransform({ secretKey: import.meta.env.VITE_APP_SECURE_LOCAL_STORAGE_HASH_KEY })

export const store = configureStore<{
  auth: AuthState
}>({
  reducer: {
    auth: persistReducer({ key: "auth", storage: localStorage, transforms: [encryptor] }, authReducer)
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
	}),
  devTools: !import.meta.env.PROD
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
