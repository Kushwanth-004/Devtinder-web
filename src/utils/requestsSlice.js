import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export default requestsSlice.reducer;
export const { addRequest, removeRequest } = requestsSlice.actions;
