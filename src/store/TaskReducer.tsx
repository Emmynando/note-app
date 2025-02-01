import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  task_title: string;
  task_body: string;
  reminder?: string;
  scheduleStart?: string;
  scheduleEnd?: string;
  taskCategory?: string;
  userId?: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // Add multiple tasks to state
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    // Add a single task to the array
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    // Update a task by id
    updateTask: (
      state,
      action: PayloadAction<{ id: string; data: Partial<Task> }>
    ) => {
      const { id, data } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...data };
      }
    },
    // Remove a task by id
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    // Clear all tasks
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const { setTasks, addTask, updateTask, removeTask, clearTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
