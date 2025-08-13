import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase'; // Подключи свой клиент

interface Todo {
    id: string;
    text: string;
    status: boolean;
}

export const createTodo = createAsyncThunk<
    Todo,
    { text: string; userId: string },
    { rejectValue: string }
>(
    'todos/createTodo',
    async ({ text, userId }, { rejectWithValue }) => {
        const { data, error } = await supabase
            .from('todos')
            .insert({
                text: text,
                status: false,
                userId: userId, // изменено с user_id на userId
            })
            .select()
            .single();

        if (error) {
            return rejectWithValue(error.message);
        }

        return {
            id: data.id,
            text: data.text,
            status: data.status,
            created_at: data.created_at,
            userId: data.userId
        };
    }
);
