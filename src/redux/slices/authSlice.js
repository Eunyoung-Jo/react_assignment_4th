import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: localStorage.getItem('accessToken') || null,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = null;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      localStorage.removeItem('accessToken');
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout, registerFailure, clearError } = authSlice.actions;

// 사용자 정보를 선택하는 selector 함수 정의
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
