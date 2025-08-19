import { useState, useCallback } from 'react';
import { useSupabaseClient } from './useSupabaseAuth';
import { errorNotification } from '../utils/notification';

interface Todo {
    id: string;
    text: string;
    status: boolean;
    created_at: string;
    userId: string;
}

export const useCreateTodo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { supabaseClient: supabase } = useSupabaseClient();

    const createTodo = useCallback(
        async ({ text, userId }: { text: string; userId: string }): Promise<Todo | undefined> => {
            if (!supabase) {
                // Не показываем ошибку, если клиент еще загружается
                return;
            }

            setIsLoading(true);


            try {
                const { data, error } = await supabase
                    .from('todos')
                    .insert({
                        text: text,
                        status: false,
                        userId: userId,
                    })
                    .select()
                    .single();

                if (error) {
                    throw new Error(error.message);
                }

                if (!data) {
                    throw new Error('Не удалось создать задачу');
                }

                return {
                    id: data.id,
                    text: data.text,
                    status: data.status,
                    created_at: data.created_at,
                    userId: data.userId
                };
            } catch (err) {
                errorNotification('Ошибка', err instanceof Error ? err.message : 'Произошла ошибка при создании задачи');
            } finally {
                setIsLoading(false);
            }
        },
        [supabase]
    );

    return {
        createTodo,
        isLoading
    };
};