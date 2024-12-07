import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITaskItem } from "../../components/shared/task-item";

interface TaskSliceState {
  idCounter: number;
  items: ITaskItem[];
}

export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchAllTasks",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    ).then((res) => res.json());
    return response;
  }
);

const initialState: TaskSliceState = {
  idCounter: 0,
  items: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ITaskItem>) => {
      state.items.push(action.payload);
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    toggleTaskCompleted: (state, action: PayloadAction<number>) => {
      const task = state.items.find((item) => item.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    editItem: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const task = state.items.find((item) => item.id === action.payload.id);

      if (task) {
        task.title = action.payload.title;
      }
    },

    addIdCounter: (state) => {
      state.idCounter += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.items = action.payload;
      state.idCounter = action.payload.length + 1;
    });
  },
});

export const {
  addItem,
  removeItem,
  toggleTaskCompleted,
  editItem,
  addIdCounter,
} = taskSlice.actions;

export default taskSlice.reducer;
