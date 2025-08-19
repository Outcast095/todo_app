import { useState } from 'react';
import { useSupabaseClient } from './useSupabaseAuth';
import { errorNotification } from '../utils/notification';

type DeleteTodoParams = {
    id: string;
    userId: string;
};

export const useDeleteTodo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { supabaseClient: supabase } = useSupabaseClient();

    const deleteTodo = async ({ id, userId }: DeleteTodoParams) => {
        if (!supabase) {
            // Не показываем ошибку, если клиент еще загружается
            return;
        }

        try {
            setIsLoading(true);


            const { error: deleteError } = await supabase
                .from('todos')
                .delete()
                .eq('id', id)
                .eq('userId', userId);

            if (deleteError) {
                errorNotification('Ошибка', deleteError.message);
                return;
            }

            return id;
        } catch (err) {
            errorNotification('Ошибка', err instanceof Error ? err.message : 'Произошла ошибка при удалении задачи');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        deleteTodo,
        isLoading
    };
};