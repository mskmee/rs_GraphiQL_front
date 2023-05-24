import { UserStateLoginStatus } from '@/types/UserStateLoginStatus';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  loginStatus: UserStateLoginStatus;
  userName: string;
  isUserLogged: boolean;
  lang: string;
}

const initialState: userState = {
  loginStatus: '',
  userName: '',
  isUserLogged: false,
  lang: 'en',
};

const userStateSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    changeLoginStatus(state, action: PayloadAction<UserStateLoginStatus>) {
      state.loginStatus = action.payload;
    },
    changeUserName(state, actions: PayloadAction<string>) {
      state.userName = actions.payload;
    },
    changeIsUserLogged(state, action: PayloadAction<boolean>) {
      state.isUserLogged = action.payload;
    },
    changeLang(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
  },
});

export const { changeLoginStatus, changeUserName, changeIsUserLogged, changeLang } =
  userStateSlice.actions;

export default userStateSlice.reducer;
