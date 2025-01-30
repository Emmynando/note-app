import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserReducer";
import taskReducer from "./TaskReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
  },
});

// Export types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store to use in your app
export default store;
