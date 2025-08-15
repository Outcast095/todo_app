import { useState } from 'react';
import { useSupabaseClient } from './useSupabaseAuth';

interface Todo {
    id: string;
    text: string;
    status: boolean;
}

type UpdateTodoStatusParams = {
    id: string;
    status: boolean;
    userId: string;
};

export const useUpdateTodoStatus = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = useSupabaseClient();

    const updateTodoStatus = async ({ id, status, userId }: UpdateTodoStatusParams) => {
        if (!supabase) {
            setError('Supabase client not initialized');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const { data, error: updateError } = await supabase
                .from('todos')
                .update({ status })
                .eq('id', id)
                .eq('userId', userId)
                .select()
                .single();

            if (updateError) {
                setError(updateError.message);
                return;
            }

            return {
                id: data.id,
                text: data.text,
                status: data.status
            };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while updating the todo status');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateTodoStatus,
        isLoading,
        error
    };
};