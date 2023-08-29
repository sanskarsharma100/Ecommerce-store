import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/User/userSlice";
import cartReducer from "../features/Cart/cartSlice";
import { userAuthApi } from "./../services/userAuthApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    [userAuthApi.reducerPath]: userAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
