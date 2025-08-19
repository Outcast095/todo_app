// features/todos/todosSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';



// Тип одной задачи
export interface Todo {
    id: string;           // UUID из Supabase
    text: string;         // Название задачи
    status: boolean;      // Выполнена или нет
    category_id?: string; // Связанная категория (необязательная)
}

// Тип состояния
interface TodosState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    pageSize: number;
    totalCount: number;
}

// Начальное состояние
const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null,
    currentPage: 1,
    pageSize: 7,
    totalCount: 0,
};

// Создание слайса
const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload;
        },
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        },
        setTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.unshift(action.payload);
            state.totalCount += 1;
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            state.totalCount -= 1;
        },
        updateTodoStatus: (state, action: PayloadAction<{id: string; status: boolean}>) => {
            const todo = state.todos.find(t => t.id === action.payload.id);
            if (todo) {
                todo.status = action.payload.status;
            }
        }
    },
    extraReducers: (builder) => {},
});

export const { 
    setCurrentPage, 
    setPageSize, 
    setTodos, 
    setTotalCount, 
    addTodo, 
    removeTodo, 
    updateTodoStatus 
} = todosSlice.actions;

// Экспорт редьюсера
export default todosSlice.reducer;
