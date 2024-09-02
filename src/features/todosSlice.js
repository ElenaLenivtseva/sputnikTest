import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllTodosAsync = createAsyncThunk(
  "todos/getAllTodos",
  async () => {
    const resp = await fetch("http://localhost:3001/todos");
    if (resp.ok) {
      const data = await resp.json();
      return data;
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",

  async (todo) => {
    const resp = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (resp.ok) {
      const data = await resp.json();
      return data;
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",

  async (todoId) => {
    const resp = await fetch(`http://localhost:3001/todos/${todoId}`, {
      method: "DELETE",
    });
    if (resp.ok) {
      const data = await resp.json();
      return data;
    }
  }
);

export const changeStatusTodoAsync = createAsyncThunk(
  "todos/changeStatusTodo",

  async (todo) => {
    const resp = await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      body: JSON.stringify(todo),
      headers: {
        "content-type": "application/json",
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      return data;
    }
  }
);

export const getFiltredTodosByStatusAsync = createAsyncThunk(
  "todos/getFiltredTodosByStatus",
  async (done) => {
    const resp = await fetch(`http://localhost:3001/todos?completed=${done}`);
    if (resp.ok) {
      const filteredProducts = await resp.json();
      return filteredProducts;
    }
  }
);
export const getFavoriteTodosAsync = createAsyncThunk(
  "todos/getavoriteTodos",
  async () => {
    const resp = await fetch(`http://localhost:3001/todos?favorite=true`);
    if (resp.ok) {
      const filteredProducts = await resp.json();
      return filteredProducts;
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodosAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        const id = action.payload.id;
        const filtered = state.filter((e) => e.id !== id);
        return filtered;
      })
      .addCase(getFavoriteTodosAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getFiltredTodosByStatusAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(changeStatusTodoAsync.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state[index] = { ...state[index], ...action.payload };
        }
      });
  },
});

export default todosSlice.reducer;
