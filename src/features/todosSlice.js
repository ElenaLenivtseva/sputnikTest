import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



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

export const getAllTodosLimitedAsync = createAsyncThunk(
  "todos/getAllTodosLimited",
  async (number) => {
    const resp = await fetch(`http://localhost:3001/todos?_page=${number}`);
    if (resp.ok) {
      const data = await resp.json();
      return data;
    }
  }
);
// todos?_page=1&favorite=false
export const getFiltredTodosAsync = createAsyncThunk(
  "todos/getFiltredTodos",
  async (info) => {
    const resp = await fetch(
      `http://localhost:3001/todos?_page=${info.page}&${info.type}=${info.status}`
    );
    if (resp.ok) {
      const data = await resp.json();
      return data;
    }
  }
);


export const todosSlice = createSlice({
  name: "todos",
  initialState: { todos: [], totalPages: 1 },
  reducers: {
    clearTodos(state,action){
      return {...state, todos: []}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodosLimitedAsync.fulfilled, (state, action) => {
        return {
          ...state,
          todos: [...action.payload.data],
          totalPages: action.payload.pages,
        };
      })
      .addCase(getFiltredTodosAsync.fulfilled, (state, action) => {
        return {
          ...state,
          todos: [...action.payload.data],
          totalPages: action.payload.pages,
        };
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        return { ...state, todos: [...state.todos, action.payload] };
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        const id = action.payload.id;
        const filtered = state.filter((e) => e.id !== id);
        return { ...state, todos: [...filtered] };
      })
      .addCase(changeStatusTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = { ...state.todos[index], ...action.payload };
        }
      });
  },
});

export const {clearTodos} = todosSlice.actions
export default todosSlice.reducer;
