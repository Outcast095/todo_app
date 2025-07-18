// Импорт функции createAsyncThunk из Redux Toolkit для создания асинхронных действий
import { createAsyncThunk } from '@reduxjs/toolkit';
// Импорт библиотеки axios для выполнения HTTP-запросов
import axios from 'axios';
import {todoList} from "../../mocks/todos";


// Импорт типов Pizza и SearchPizzaParams для типизации данных и параметров
//import { Pizza, SearchPizzaParams } from './types';

//createAsyncThunk<Pizza[], SearchPizzaParams>
export const mockTodos = async (): Promise<{ id: number; text: string; status: boolean }[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(todoList);
        }, 500); // ⏱ задержка 500 мс
    });
};


// Создание асинхронного действия для получения пицц с помощью createAsyncThunk
export const fetchMockTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const data = await mockTodos();
    return data;
});