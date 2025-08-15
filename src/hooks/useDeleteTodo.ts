import { useState } from 'react';
import { useSupabaseClient } from './useSupabaseAuth';

type DeleteTodoParams = {
    id: string;
    userId: string;
};

export const useDeleteTodo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = useSupabaseClient();

    const deleteTodo = async ({ id, userId }: DeleteTodoParams) => {
        if (!supabase) {
            setError('Supabase client not initialized');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const { error: deleteError } = await supabase
                .from('todos')
                .delete()
                .eq('id', id)
                .eq('userId', userId);

            if (deleteError) {
                setError(deleteError.message);
                return;
            }

            return id;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while deleting the todo');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        deleteTodo,
        isLoading,
        error
    };
};