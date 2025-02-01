import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserReducer";
import taskReducer from "./TaskReducer";
import { taskApi } from "./taskApi";

const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

// Export types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store to use in your app
export default store;
