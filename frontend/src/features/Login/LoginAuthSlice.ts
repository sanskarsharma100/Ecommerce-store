import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface isAuthState {
  value: boolean;
}

const initialState: isAuthState = {
  value: false,
}

export const IsAuthSlice = createSlice({
  name: 'isAuth',
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

export const { loggedIn, loggedOut } = IsAuthSlice.actions

export const selectIsAuth = (state: RootState) => state.isAuth.value

export default IsAuthSlice.reducer