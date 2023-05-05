import { SliceCaseReducers } from '@reduxjs/toolkit';
import toolkit from './toolkit';

export interface State {
  loginStatus: '' | 'sign-in' | 'sign-up' | 'reset-password';
}

const { createSlice } = toolkit;
const stateSlice = createSlice<State, SliceCaseReducers<State>>({
  name: 'state',
  initialState: {
    loginStatus: '',
  },
  reducers: {
    changeLoginStatus(state, action) {
      state.loginStatus = action.payload.status;
    },
  },
});

export const { changeLoginStatus } = stateSlice.actions;
export default stateSlice.reducer;
