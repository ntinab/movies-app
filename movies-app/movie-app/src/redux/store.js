import { persistReducer, persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import appReducer from './reducer'
import thunk from 'redux-thunk'

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export const persistor = persistStore(store);