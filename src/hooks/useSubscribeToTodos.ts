import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

type SubscribeToTodosParams = {
    userId: string;
    onTodosChange: () => void;
};

export const useSubscribeToTodos = ({ userId, onTodosChange }: SubscribeToTodosParams) => {
    useEffect(() => {
        if (!userId) return;

        const subscription = supabase
            .channel('todos_channel')
            .on('postgres_changes',
                {
                    event: '*',  // Слушаем все события (INSERT, UPDATE, DELETE)
                    schema: 'public',
                    table: 'todos',
                    filter: `userId=eq.${userId}` // Фильтруем только записи текущего пользователя
                },
                () => {
                    onTodosChange();
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [userId, onTodosChange]);
};