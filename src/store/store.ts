import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "@/features/repo-slice";

export const store = configureStore({
  reducer: {
    repos: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
