// features/todos/todosSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTodos } from './fetchTodos';
import { createTodo } from './createTodos';
import { updateTodoStatus } from './updateTodoStatus';
import { deleteTodo } from './deleteTodos';

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
    },
    extraReducers: (builder) => {
        // fetchTodos
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.todos = action.payload.todos;
            state.totalCount = action.payload.totalCount;
        });
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // createTodo
        builder.addCase(createTodo.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
            state.loading = false;
            state.todos.unshift(action.payload); // добавляем в начало
            state.totalCount += 1; // увеличиваем общий счетчик
        })
        builder.addCase(createTodo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // updateTodoStatus
        builder.addCase(updateTodoStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateTodoStatus.fulfilled, (state, action: PayloadAction<Todo>) => {
            state.loading = false;
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        });
        builder.addCase(updateTodoStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // deleteTodo
        builder.addCase(deleteTodo.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            state.totalCount -= 1; // уменьшаем общий счетчик
        });
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { setCurrentPage, setPageSize } = todosSlice.actions;

// Экспорт редьюсера
export default todosSlice.reducer;
