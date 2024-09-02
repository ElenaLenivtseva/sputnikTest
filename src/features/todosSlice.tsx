import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllTodosAsync = createAsyncThunk("todos/getAllTodos", async () => {
  const resp = await fetch("http://localhost:3001/todos");
  if (resp.ok) {
    const todos = await resp.json();
    return todos;
  }
});

export const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTodosAsync.fulfilled, (state, action) => {
      return action.payload;
    })
  },
});

export default todosSlice.reducer;
