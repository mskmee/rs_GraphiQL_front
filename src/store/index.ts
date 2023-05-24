import { configureStore } from '@reduxjs/toolkit';

import userStateReducer from './userSlice';
import schemaStateReducer from './schemaSlice';

export const store = configureStore({
  reducer: {
    userState: userStateReducer,
    schemaState: schemaStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
