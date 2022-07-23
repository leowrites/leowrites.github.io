import { createSlice } from "@reduxjs/toolkit";

export const viewSlice = createSlice({
  name: "view",
  initialState: {
    value: "none",
  },
  reducers: {
    lookAtFolder: (state) => {
      state.value = "folder";
    },
  },
});
export default viewSlice.reducer;
export const { lookAtFolder } = viewSlice.actions;
export const selectView = (state) => state.view.value;
