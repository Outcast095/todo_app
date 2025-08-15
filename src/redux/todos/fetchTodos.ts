import { createAsyncThunk } from '@reduxjs/toolkit';
import { useSupabaseClient } from '../../hooks/useSupabaseAuth';

interface Todo {
    id: string;
    text: string;
    status: boolean;
}

interface FetchTodosParams {
    userId: string;
    page: number;
    pageSize: number;
}

interface FetchTodosResponse {
    todos: Todo[];
    totalCount: number;
}

export const fetchTodos = createAsyncThunk<
    FetchTodosResponse,
    FetchTodosParams,
    { rejectValue: string }
>(
    'todos/fetchTodos',
    async ({ userId, page, pageSize }, { rejectWithValue }) => {
        try {
            const supabase = useSupabaseClient();
            if (!supabase) {
                return rejectWithValue('Supabase client not initialized');
            }

            // Получаем общее количество записей
            const { count, error: countError } = await supabase
                .from('todos')
                .select('*', { count: 'exact', head: true })
                .eq('userId', userId);

            if (countError) {
                return rejectWithValue(countError.message);
            }

            // Получаем данные с пагинацией
            const from = (page - 1) * pageSize;
            const to = from + pageSize - 1;

            const { data, error } = await supabase
                .from('todos')
                .select('*')
                .eq('userId', userId)
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) {
                return rejectWithValue(error.message);
            }

            const todos = data.map((item: any) => ({
                id: item.id,
                text: item.text,
                status: item.status,
            }));

            return {
                todos,
                totalCount: count || 0,
            };
        } catch (err) {
            return rejectWithValue('Failed to fetch todos');
        }
    }
);
