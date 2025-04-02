import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Correctly importing the userSlice reducer

const appStore = configureStore({
  reducer: {
    user: userReducer, // Using userSlice.reducer here
  },
});

export default appStore; // Exporting the Redux store
