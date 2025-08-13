import { useClerk } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useClerk();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};