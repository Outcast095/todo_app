import { useEffect } from 'react';
import { useSupabaseClient } from './useSupabaseAuth';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type TodoEvent = {
    type: 'INSERT' | 'UPDATE' | 'DELETE';
    todo?: {
        id: string;
        status: boolean;
        text: string;
    };
};

type SubscribeToTodosParams = {
    userId: string;
    onTodosChange: (event: TodoEvent) => void;
};

type TodoPayload = {
    id: string;
    status: boolean;
    text: string;
    created_at: string;
    userId: string;
};

export const useSubscribeToTodos = ({ userId, onTodosChange }: SubscribeToTodosParams) => {
    const supabase = useSupabaseClient();

    useEffect(() => {
        if (!userId || !supabase) return;

        const subscription = supabase
            .channel('todos_channel')
            .on('postgres_changes',
                {
                    event: '*',  // Слушаем все события (INSERT, UPDATE, DELETE)
                    schema: 'public',
                    table: 'todos',
                    filter: `userId=eq.${userId}` // Фильтруем только записи текущего пользователя
                },
                (payload: RealtimePostgresChangesPayload<TodoPayload>) => {
                    const event: TodoEvent = {
                        type: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
                        // Для DELETE событий payload.new будет null, поэтому используем payload.old
                        todo: payload.eventType === 'DELETE' 
                            ? payload.old as { id: string; status: boolean; text: string; }
                            : payload.new as { id: string; status: boolean; text: string; }
                    };
                    console.log(`Todo ${event.type} event:`, event.todo);
                    onTodosChange(event);
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [userId, onTodosChange, supabase]);
};