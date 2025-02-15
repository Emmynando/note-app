import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state of the user
interface UserState {
  userId: string | null;
  userToken: string | null;
}

const initialState: UserState = {
  userId: null,
  userToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set user info
    setUserInfo: (
      state,
      action: PayloadAction<{ userId: string; userToken: string }>
    ) => {
      state.userId = action.payload.userId;
      state.userToken = action.payload.userToken;
    },
    // Action to clear user info (e.g., on logout)
    clearUserInfo: (state) => {
      state.userId = null;
      state.userToken = null;
      // Clear localStorage
      localStorage.removeItem("userId");
      localStorage.removeItem("userToken");
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
