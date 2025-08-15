import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';

interface Todo {
    id: string;
    text: string;
    status: boolean;
    created_at: string;
    userId: string;
}

export const createTodo = createAsyncThunk<
    Todo,
    { text: string; userId: string },
    { rejectValue: string }
>(
    'todos/createTodo',
    async ({ text, userId }, { rejectWithValue }) => {
        try {

            const { data, error } = await supabase
                .from('todos')
                .insert({
                    text: text,
                    status: false,
                    userId: userId,
                })
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }

            if (!data) {
                throw new Error('Не удалось создать задачу');
            }

            return {
                id: data.id,
                text: data.text,
                status: data.status,
                created_at: data.created_at,
                userId: data.userId
            };
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Произошла ошибка при создании задачи');
        }
    }
);
