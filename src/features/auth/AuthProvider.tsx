import React, { createContext, useContext, ReactNode } from 'react';
import { useClerk, useAuth } from '@clerk/clerk-react';
import { useSupabaseClient } from '../../hooks/useSupabaseAuth';
import { message } from 'antd';
import { LoadingSpinner } from '../../components/loadingSpinner/LoadingSpinner';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    userId: string | null;
    supabaseError: string | null;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { isSignedIn, userId } = useAuth();
    const { signOut } = useClerk();
    const { supabaseClient, error: supabaseError, isLoading } = useSupabaseClient();

    const handleSignOut = async () => {
        try {
            await signOut();
            message.success('Вы успешно вышли из системы');
        } catch (error) {
            console.error('Error signing out:', error);
            message.error('Ошибка при выходе из системы');
        }
    };

    if (isLoading) {
        return <LoadingSpinner tip="Инициализация приложения..." />;
    }

    const value = {
        isAuthenticated: isSignedIn ?? false,
        isLoading,
        userId: userId ?? null,
        supabaseError,
        signOut: handleSignOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};