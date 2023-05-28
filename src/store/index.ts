import { configureStore } from '@reduxjs/toolkit';

import userStateReducer from './userSlice';

export const store = configureStore({
  reducer: {
    userState: userStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
