import { createAsyncThunk } from '@reduxjs/toolkit';
import { useSupabaseClient } from '../../hooks/useSupabaseAuth';

interface Todo {
    id: string;
    text: string;
    status: boolean;
}

export const updateTodoStatus = createAsyncThunk<
    Todo,
    { id: string; status: boolean; userId: string },
    { rejectValue: string }
>(
    'todos/updateTodoStatus',
    async ({ id, status, userId }, { rejectWithValue }) => {
        const supabase = useSupabaseClient();
        if (!supabase) {
            return rejectWithValue('Supabase client not initialized');
        }

        const { data, error } = await supabase
            .from('todos')
            .update({ status })
            .eq('id', id)
            .eq('userId', userId)
            .select()
            .single();

        if (error) {
            return rejectWithValue(error.message);
        }

        return {
            id: data.id,
            text: data.text,
            status: data.status
        };
    }
);