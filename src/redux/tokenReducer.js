import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: null,
  reducers: {
    createToken(state, action) {
      return action.payload;
    },
    deleteToken(state, action) {
      return null;
    },
  },
});

const { actions, reducer } = tokenSlice;

export const { createToken, deleteToken } = actions;
export default reducer;
