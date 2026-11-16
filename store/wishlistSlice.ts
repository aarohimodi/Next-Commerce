import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type WishlistState = {
  isWishlistOpen: boolean;
  wishlistItems: any[];
};

const initialState: WishlistState = {
  isWishlistOpen: false,
  wishlistItems: [],
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    openWishlist: (state) => {
      state.isWishlistOpen = true;
    },
    closeWishlist: (state) => {
      state.isWishlistOpen = false;
    },
    setWishlistItems: (state, action) => {
      state.wishlistItems = action.payload;
    },
  },
});
export const { openWishlist, closeWishlist, setWishlistItems } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
