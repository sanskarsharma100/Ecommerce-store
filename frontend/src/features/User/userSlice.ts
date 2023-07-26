import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface User {
  avatar: {
    public_id: string;
    url: string;
  };
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserSliceState {
  isAuthenticated: boolean;
  user: User;
}

const initialState: UserSliceState = {
  isAuthenticated: false,
  user: {} as User,
};

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    assignCurrentUser: (state, action: PayloadAction<any>) => {
      Object.assign(state, action.payload);
    },
    removeCurrentUser: () => {
      return {
        isAuthenticated: false,
        user: {} as User,
      };
    },
  },
});

export const { assignCurrentUser, removeCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user;

export default userSlice.reducer;
