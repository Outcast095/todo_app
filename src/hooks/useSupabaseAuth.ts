import { useAuth } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const useSupabaseClient = () => {
    const { getToken } = useAuth();
    const [supabaseClient, setSupabaseClient] = useState<any>(null);

    useEffect(() => {
        const createSupabase = async () => {
            const token = await getToken();
            if (!token) return;

            const client = createClient(supabaseUrl, supabaseAnonKey, {
                global: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            });

            setSupabaseClient(client);
        };

        createSupabase();
    }, [getToken]);

    return supabaseClient;
};
