import { createAsyncThunk } from "@reduxjs/toolkit";
import { TypeStatus } from "../components/Todolist/Todolist";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface Todo {
  id?: string;
  title: string;
  descr: string;
  completed: boolean;
  favorite: boolean;
}

interface State {
    todos: Todo[];
    totalPages: number;
    loading: boolean;
}
export interface RootState {
  todos: State;
}
const initialState: State = {
  todos: [],
  totalPages: 1,
  loading: true,
};
interface Info {
  page: number;
  type: TypeStatus;
  status: boolean;
}
interface Response {
  first: number;
  prev: number|null;
  next: number|null;
  last: number|null;
  pages: number;
  items: number;
  data: Todo[]
}

export const addTodoAsync = createAsyncThunk<Todo, Todo>(
    "todos/addTodo",

    async (todo) => {
        const resp = await fetch("http://localhost:3001/todos", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(todo),
        });
        
        if (resp.ok) {
            const data: Todo = await resp.json(); 
            return data; 
        }
        
        throw new Error('Failed to add todo'); 
    }
);


export const deleteTodoAsync = createAsyncThunk<Todo, string>(
    "todos/deleteTodo",

    async (todoId) => {
        const resp = await fetch(`http://localhost:3001/todos/${todoId}`, {
            method: "DELETE",
        });
        
        if (resp.ok) {
            const data: Todo = await resp.json(); 
            return data; 
        }
        
        throw new Error('Failed to delete todo'); 
    }
);


export const changeStatusTodoAsync = createAsyncThunk<Todo, Todo>(
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
            const data: Todo = await resp.json(); 
            return data; 
        }
        
        throw new Error('Failed to change status of todo'); // Обработка ошибок
    }
);


export const getAllTodosLimitedAsync = createAsyncThunk<Response, number>(
    "todos/getAllTodosLimited",
    async (number) => {
        const resp = await fetch(`http://localhost:3001/todos?_page=${number}`);
        if (resp.ok) {
            const data: Response = await resp.json(); 
            return data; 
        }
        throw new Error('Failed to fetch todos'); 
    }
);


export const getFiltredTodosAsync = createAsyncThunk<Response, Info>(
    "todos/getFiltredTodos",
    async (info) => {
        const resp = await fetch(
            `http://localhost:3001/todos?_page=${info.page}&${info.type}=${info.status}`
        );
        if (resp.ok) {
            const data: Response = await resp.json(); 
            return data; 
        }
        throw new Error('Failed to fetch filtered todos'); // Обработка ошибок
    }
);


export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodos(state){
      return {...state, todos: []}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodosLimitedAsync.fulfilled, (state, action: PayloadAction<Response>) => {
        return {
          ...state,
          todos: [...state.todos,...action.payload.data],
          totalPages: action.payload.pages,
          loading: false
        };
      })
      .addCase(getAllTodosLimitedAsync.pending, (state) => {
        return {
          ...state,
          loading: true
        };
      })
      .addCase(getFiltredTodosAsync.fulfilled, (state, action: PayloadAction<Response>) => {
        return {
          ...state,
          todos: [...state.todos, ...action.payload.data],
          totalPages: action.payload.pages,
          loading: false
        };
      })
      .addCase(getFiltredTodosAsync.pending, (state) => {
        return {
          ...state,
         loading: true
        };
      })
      .addCase(addTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        return { ...state, todos: [...state.todos, action.payload] };
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        const id = action.payload.id;
        
        const filtered = state.todos.filter((e) => e.id !== id);
       
        return { ...state, todos: [...filtered] };
      })
      .addCase(changeStatusTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
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
