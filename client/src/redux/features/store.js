import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import allUserReducer from "./users/allUsersSlice";

const rootReducer = combineReducers({
  user: userReducer,
  allUser: allUserReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
