import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';

export const deleteTodo = createAsyncThunk<
    string,
    { id: string; userId: string },
    { rejectValue: string }
>(
    'todos/deleteTodo',
    async ({ id, userId }, { rejectWithValue }) => {
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id)
            .eq('userId', userId);

        if (error) {
            return rejectWithValue(error.message);
        }

        return id; // Возвращаем id удаленного todo
    }
);