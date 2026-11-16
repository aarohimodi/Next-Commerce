import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  isCartOpen: boolean;
  cartItems: any[];
  subTotal: number;
  total: number;
  deliveryCharges: number;
};

const initialState: CartState = {
  isCartOpen: false,
  cartItems: [],
  subTotal: 0,
  total: 0,
  deliveryCharges: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    setCartItems: (state, action: PayloadAction<any[]>) => {
      state.cartItems = action.payload;
    },
    setSubTotal: (state, action: PayloadAction<number>) => {
      state.subTotal = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setDeliveryCharges: (state, action: PayloadAction<number>) => {
      state.deliveryCharges = action.payload;
    },
    clearCartItems: (state) => {
      state.cartItems = [];
    },
  },
});
export const {
  openCart,
  closeCart,
  setCartItems,
  clearCartItems,
  setTotal,
  setDeliveryCharges,
  setSubTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
