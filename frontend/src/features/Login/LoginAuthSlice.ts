import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface LoginAuthState {
  value: boolean;
}

const initialState: LoginAuthState = {
  value: false,
}

export const LoginSlice = createSlice({
  name: 'loginAuth',
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.value = true
    },
    loggedOut: (state) => {
      state.value = false
    }
  },
})

export const { loggedIn, loggedOut } = LoginSlice.actions

export const selectLoginAuth = (state: RootState) => state.loginAuth.value

export default LoginSlice.reducer