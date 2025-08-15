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
    },
    extraReducers: (builder) => {},
});

export const { setCurrentPage, setPageSize } = todosSlice.actions;

// Экспорт редьюсера
export default todosSlice.reducer;
