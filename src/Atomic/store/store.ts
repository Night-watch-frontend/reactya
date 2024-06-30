import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { filmApi } from "../servicess/film";
import searchReducer from "./searchSlice";
import userReducer from "./userSlice";

const rootReduser = combineReducers({
  [filmApi.reducerPath]: filmApi.reducer,
  search: searchReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReduser,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
