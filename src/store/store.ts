import { configureStore } from "@reduxjs/toolkit";
import { repoSlice } from "../features/repoSlice";

export const store = configureStore({
  reducer: {
    repos: repoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
