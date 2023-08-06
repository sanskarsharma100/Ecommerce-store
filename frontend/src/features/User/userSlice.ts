import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

import { User } from "../../utils/types";

interface UserSliceState {
  isAuthenticated: boolean;
  user: User;
}

const initialState: UserSliceState = {
  isAuthenticated: JSON.parse(
    localStorage.getItem("isAuthenticated") || "false"
  ),
  user:
    localStorage.getItem("user") != null
      ? JSON.parse(localStorage.getItem("user") || ({} as string))
      : ({} as User),
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
