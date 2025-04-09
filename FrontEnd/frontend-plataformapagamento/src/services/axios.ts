import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: 'https://simpleapp.parron01.com/api',
});

// Mapeamento de quais endpoints são públicos
const publicEndpoints = [
    '/auth/login',
    '/users/register',
    '/swagger-ui/',
    '/v3/api-docs/'
];

// Verifica se o endpoint é público
function isPublicEndpoint(url: string) {
    return publicEndpoints.some(endpoint => url.includes(endpoint));
}

// Adiciona o token apenas para endpoints protegidos
api.interceptors.request.use(
    (config) => {
        // Se a URL não for pública, adiciona o token de autenticação
        if (!isPublicEndpoint(config.url || '')) {
            const token = Cookies.get('auth_token');
            
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } else {
            // Para endpoints públicos, garantimos que não há header de Authorization
            delete config.headers['Authorization'];
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratar erros de autenticação (401/403)
api.interceptors.response.use(
    response => response,
    error => {
        // Evitar redirecionamentos infinitos - não redirecionar se já estiver na página de login
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            if (
                error.config.url !== '/auth/login' && 
                !window.location.pathname.includes('/login')
            ) {
                Cookies.remove('auth_token', { path: '/' });
                Cookies.remove('user_id', { path: '/' });
                
                // Redirecionar para login se necessário
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);