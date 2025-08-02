import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "../services/githubApi.ts";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (gDM) => gDM().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
