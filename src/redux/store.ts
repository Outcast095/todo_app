// Импорт функции configureStore из Redux Toolkit для создания Redux store
import { configureStore } from '@reduxjs/toolkit';
// Импорт хука useDispatch из react-redux для использования диспетчера в компонентах
import { useDispatch } from 'react-redux';

// Импорт редюсеров для различных срезов состояния
import todos from './todos/slice'; // Редюсер для управления фильтрами


// Создание Redux store с помощью configureStore
export const store = configureStore({
    reducer: {
        todos, // Подключение редюсера фильтров к store под ключом 'todos'

    },
});

// Определение типа RootState на основе возвращаемого типа метода getState store
export type RootState = ReturnType<typeof store.getState>;

// Определение типа AppDispatch на основе диспетчера store
type AppDispatch = typeof store.dispatch;

// Экспорт кастомного хука useAppDispatch для типизированного использования диспетчера
export const useAppDispatch = () => useDispatch<AppDispatch>();