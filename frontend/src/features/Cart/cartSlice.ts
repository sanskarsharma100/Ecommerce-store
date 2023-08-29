import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

import { Cart } from "../../utils/types";

interface CartSliceState {
  cart: Cart;
}

const initialState: CartSliceState = {
  cart: {} as Cart,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<any>) => {
      Object.assign(state, action.payload);
    },
    emptyCart: () => {
      return {
        cart: {} as Cart,
      };
    },
  },
});

export const { addCart, emptyCart } = cartSlice.actions;

export const cart = (state: RootState) => state.cart;

export default cartSlice.reducer;
