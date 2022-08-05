import { createSlice } from "@reduxjs/toolkit";

export const viewSlice = createSlice({
  name: "view",
  initialState: {
    view: "start",
    transition: "",
  },
  reducers: {
    setView(state, action) {
      state.view = action.payload;
    },
    setTransition(state, action) {
      state.transition = action.payload;
    },
  },
});

export const { setView, setTransition } = viewSlice.actions;

export default viewSlice.reducer;
