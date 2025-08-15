import { createAsyncThunk } from '@reduxjs/toolkit';
import { useSupabaseClient } from '../../hooks/useSupabaseAuth';

export const deleteTodo = createAsyncThunk<
    string,
    { id: string; userId: string },
    { rejectValue: string }
>(
    'todos/deleteTodo',
    async ({ id, userId }, { rejectWithValue }) => {
        const supabase = useSupabaseClient();
        if (!supabase) {
            return rejectWithValue('Supabase client not initialized');
        }

        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id)
            .eq('userId', userId);

        if (error) {
            return rejectWithValue(error.message);
        }

        return id;
    }
);