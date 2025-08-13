import { SupabaseClient } from '@supabase/supabase-js';

// Тип для возвращаемых данных пользователя
export interface UserData {
    userId: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    isAuthenticated: boolean;
    error: string | null; // Добавляем поле error
}

// Функция для получения данных текущего пользователя
export const getCurrentUser = async (supabaseClient: SupabaseClient): Promise<UserData> => {
    try {
        if (!supabaseClient) {
            return {
                userId: null,
                email: null,
                firstName: null,
                lastName: null,
                isAuthenticated: false,
                error: 'Supabase client is not initialized',
            };
        }

        // Получаем данные пользователя из Supabase
        const { data: userData, error: userError } = await supabaseClient.auth.getUser();
        if (userError || !userData?.user?.id) {
            return {
                userId: null,
                email: null,
                firstName: null,
                lastName: null,
                isAuthenticated: false,
                error: userError?.message || 'User not authenticated',
            };
        }

        return {
            userId: userData.user.id,
            email: userData.user.email || null,
            firstName: userData.user.user_metadata?.first_name || null,
            lastName: userData.user.user_metadata?.last_name || null,
            isAuthenticated: true,
            error: null,
        };
    } catch (err) {
        console.error('Error fetching user:', err);
        return {
            userId: null,
            email: null,
            firstName: null,
            lastName: null,
            isAuthenticated: false,
            error: err instanceof Error ? err.message : 'Failed to fetch user',
        };
    }
};