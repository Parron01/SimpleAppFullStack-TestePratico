import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { api } from "../services/axios";
import Cookies from 'js-cookie';

interface SignInCredentials {
    document: string;
    password: string;
}

interface UserInfoData {
    token: string;
    AuthenticatedUserId: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    isAuthenticated: boolean;
    isLoading: boolean;
    AuthenticatedUserInfo: UserInfoData;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [AuthenticatedUserInfo, setAuthenticatedUserInfo] = useState<UserInfoData>({
        token: '',
        AuthenticatedUserId: ''
    });

    useEffect(() => {
        // Verificar se já existe um token salvo nos cookies
        const token = Cookies.get('auth_token');
        const userId = Cookies.get('user_id');

        if (token && userId) {
            setAuthenticatedUserInfo({
                token,
                AuthenticatedUserId: userId
            });
            setIsAuthenticated(true);
        }
        
        setIsLoading(false);
    }, []);

    async function signIn({ document, password }: SignInCredentials) {
        try {
            setIsLoading(true);
            
            const response = await api.post('/auth/login', {
                document,
                password
            });
    
            const { token, userId } = response.data;
    
            // Salvar no estado
            setAuthenticatedUserInfo({
                token,
                AuthenticatedUserId: userId.toString()
            });
            
            setIsAuthenticated(true);
            
            // Salvar nos cookies (expira em 7 dias)
            Cookies.set('auth_token', token, { expires: 7, path: '/' });
            Cookies.set('user_id', userId.toString(), { expires: 7, path: '/' });
            
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    function logOut() {
        // Limpar estado
        setIsAuthenticated(false);
        setAuthenticatedUserInfo({
            token: '',
            AuthenticatedUserId: ''
        });
        
        // Remover dos cookies
        Cookies.remove('auth_token', { path: '/' });
        Cookies.remove('user_id', { path: '/' });
        
        // Remover das requisições futuras
        delete api.defaults.headers.common['Authorization'];
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, isLoading, AuthenticatedUserInfo, signIn, logOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}