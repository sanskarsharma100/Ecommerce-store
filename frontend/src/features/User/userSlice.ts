import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

const initialState: object = {}

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    assignCurrentUser: (state,action:PayloadAction<any>) => {
      Object.assign(state,action.payload)
    },
  },
})

export const { assignCurrentUser } = userSlice.actions

export const selectCurrentUser = (state: RootState) => state.user

export default userSlice.reducer