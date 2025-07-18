// Импорт необходимых функций и типов из библиотек Redux Toolkit и пользовательских типов
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchMockTodos} from "./asyncActions";
//import { FilterSliceState, } from './types';


interface Todo {
    id: number;
    text: string;
    status: boolean;
}

interface TodosState {
    todos: Todo[];
    loading: boolean;
    error: boolean,
}

// Определение начального состояния для среза (slice) фильтров
const initialState: TodosState = {
        todos: [],
        loading: false,
        error: false,
};

// Создание среза (slice) для управления состоянием фильтров с помощью createSlice
const slice = createSlice({
    name: 'todos', // Название среза, используется для идентификации в Redux store
    initialState: initialState , // Начальное состояние, определенное выше
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMockTodos.pending, state => {
                state.loading = true;
            })
            .addCase(fetchMockTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchMockTodos.rejected, state => {
                state.loading = false;
                state.error = true;
            });
    },
});

// Экспорт всех действий (action creators), созданных автоматически createSlice
//export const {  } = slice.actions;

// Экспорт редюсера среза для использования в Redux store
export default slice.reducer;