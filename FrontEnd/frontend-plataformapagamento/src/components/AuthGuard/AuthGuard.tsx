import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  // Verificar se o usuário está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}