import { useState } from 'react';
import { useSupabaseClient } from './useSupabaseAuth';
import { errorNotification } from '../utils/notification';

type UpdateTodoStatusParams = {
    id: string;
    status: boolean;
    userId: string;
};

export const useUpdateTodoStatus = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { supabaseClient: supabase } = useSupabaseClient();

    const updateTodoStatus = async ({ id, status, userId }: UpdateTodoStatusParams) => {
        if (!supabase) {
            // Не показываем ошибку, если клиент еще загружается
            return;
        }

        try {
            setIsLoading(true);


            const { data, error: updateError } = await supabase
                .from('todos')
                .update({ status })
                .eq('id', id)
                .eq('userId', userId)
                .select()
                .single();

            if (updateError) {
                errorNotification('Ошибка', updateError.message);
                return;
            }

            return {
                id: data.id,
                text: data.text,
                status: data.status
            };
        } catch (err) {
            errorNotification('Ошибка', err instanceof Error ? err.message : 'Произошла ошибка при обновлении статуса задачи');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateTodoStatus,
        isLoading
    };
};