import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Correctly importing the userSlice reducer
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionsSlice";
import requestReducer from "./requestsSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer, // Using userSlice.reducer here
    feed: feedReducer,
    Connection: connectionReducer,
    request: requestReducer,
  },
});

export default appStore; // Exporting the Redux store
