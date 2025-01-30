import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  body: string;
  reminder?: string;
  schedule?: string;
  category?: string;
}

interface TaskState {
  task: Task | null;
}

const initialState: TaskState = {
  task: null,
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // Add a task to the array
    addTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
    // Update a task in the array
    // Update fields of the task
    updateTask: (state, action: PayloadAction<Partial<Task>>) => {
      if (state.task) {
        state.task = { ...state.task, ...action.payload };
      }
    },
    // Clear the task (reset to null)
    clearTask: (state) => {
      state.task = null;
    },
  },
});

export const { addTask, updateTask, clearTask } = taskSlice.actions;
export default taskSlice.reducer;
