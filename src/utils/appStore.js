import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Correctly importing the userSlice reducer
import feedReducer from "./feedSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer, // Using userSlice.reducer here
    feed: feedReducer,
  },
});

export default appStore; // Exporting the Redux store
