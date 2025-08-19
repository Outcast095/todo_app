import { useAuth } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const useSupabaseClient = () => {
    const { getToken } = useAuth();
    const [supabaseClient, setSupabaseClient] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const createSupabase = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const token = await getToken();
                if (!token) {
                    setError('Не удалось получить токен авторизации');
                    return;
                }

                const client = createClient(supabaseUrl, supabaseAnonKey, {
                    global: {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                });

                setSupabaseClient(client);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка инициализации Supabase клиента');
            } finally {
                setIsLoading(false);
            }
        };

        createSupabase();
    }, [getToken]);

    return { supabaseClient, isLoading, error };
};
