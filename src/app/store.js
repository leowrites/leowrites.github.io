import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./viewSlice";

export default configureStore({
  reducer: {
    view: viewReducer,
  },
});
