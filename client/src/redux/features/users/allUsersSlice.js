import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedUser: null,
  messages: [],
};
const allUserSlice = createSlice({
  name: "allUser",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});
export const { setSelectedUser, setMessages } = allUserSlice.actions;

export default allUserSlice.reducer;
