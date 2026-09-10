import {
  configureStore,
} from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import cartReducer from "./slices/cartSlice";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer =
  persistReducer(
    cartPersistConfig,
    cartReducer
  );

export const store =
  configureStore({
    reducer: {
      cart: persistedCartReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "persist/PERSIST",
            "persist/REHYDRATE",
            "persist/REGISTER",
            "persist/PAUSE",
            "persist/PURGE",
            "persist/FLUSH",
          ],
        },
      }),
  });

export const persistor =
  persistStore(store);

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;