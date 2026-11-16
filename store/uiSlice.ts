import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  notification: any;
  userDrawer: boolean;
  profile: boolean;
  search: string;
};

const initialState: UiState = {
  notification: null,
  userDrawer: false,
  profile: false,
  search: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.notification = action.payload;
    },

    hideNotification: (state) => {
      state.notification = null;
    },
    openDrawer: (state) => {
      state.userDrawer = true;
    },
    closeDrawer: (state) => {
      state.userDrawer = false;
    },
    openProfile: (state) => {
      state.profile = true;
    },
    closeProfile: (state) => {
      state.profile = false;
    },
    searchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  showNotification,
  hideNotification,
  openDrawer,
  closeDrawer,
  openProfile,
  closeProfile,
  searchItem,
} = uiSlice.actions;

export default uiSlice.reducer;
