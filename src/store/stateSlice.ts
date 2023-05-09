import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoginStatus = '' | 'sign-in' | 'sign-up' | 'reset-password';
type LoginError = Error | null;

interface userState {
  loginStatus: LoginStatus;
  userName: string;
  error: LoginError;
  isUserLogged: boolean;
}

const initialState: userState = {
  loginStatus: '',
  userName: '',
  error: null,
  isUserLogged: false,
};

const userStateSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    changeLoginStatus(state, action: PayloadAction<LoginStatus>) {
      state.loginStatus = action.payload;
    },
    changeUserName(state, actions: PayloadAction<string>) {
      state.userName = actions.payload;
    },
    changeError(state, action: PayloadAction<LoginError>) {
      state.error = action.payload;
    },
    changeIsUserLogged(state, action: PayloadAction<boolean>) {
      state.isUserLogged = action.payload;
    },
  },
});

export const { changeLoginStatus, changeError, changeUserName, changeIsUserLogged } =
  userStateSlice.actions;

export default userStateSlice.reducer;
