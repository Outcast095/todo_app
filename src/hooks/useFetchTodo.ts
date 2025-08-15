import { useCallback, useState } from 'react';
import { useSupabaseClient } from './useSupabaseAuth';

interface Todo {
    id: string;
    text: string;
    status: boolean;
}

interface SupabaseTodo extends Todo {
    created_at: string;
    userId: string;
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

export const useFetchTodo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = useSupabaseClient();

    const fetchTodos = useCallback(
        async ({ userId, page, pageSize }: FetchTodosParams): Promise<FetchTodosResponse | undefined> => {
            if (!supabase) {
                setError('Supabase client not initialized');
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                // Получаем общее количество записей
                const { count, error: countError } = await supabase
                    .from('todos')
                    .select('*', { count: 'exact', head: true })
                    .eq('userId', userId);

                if (countError) {
                    setError(countError.message);
                    return;
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
                    setError(error.message);
                    return;
                }

                const todos = data.map((item: SupabaseTodo) => ({
                    id: item.id,
                    text: item.text,
                    status: item.status,
                }));

                return {
                    todos,
                    totalCount: count || 0,
                };
            } catch (err) {
                setError('Failed to fetch todos');
            } finally {
                setIsLoading(false);
            }
        },
        [supabase]
    );

    return {
        fetchTodos,
        isLoading,
        error,
    };
};