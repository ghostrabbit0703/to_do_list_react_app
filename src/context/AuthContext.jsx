import {
    createContext,
    useCallback,
    useContext,
    useState,
} from 'react';

import authService from '../api/auth.service';
import { getToken, setToken } from '../utils/authToken';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setTokenState] = useState(() => getToken());
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getToken()));

    const login = useCallback(async (credentials) => {
        const response = await authService.login(credentials);
        const data = response.data || response;

        const acquiredToken = data.token;
        const acquiredUser = data.user || data;

        setToken(acquiredToken);
        setTokenState(acquiredToken);
        setUser(acquiredUser);
        setIsAuthenticated(true);

        return data;
    }, []);

    const register = useCallback(async (userData) => {
        const response = await authService.register(userData);
        const data = response.data || response;

        const acquiredToken = data.token;
        const acquiredUser = data.user || data;

        if (acquiredToken) {
            setToken(acquiredToken);
            setTokenState(acquiredToken);
            setUser(acquiredUser);
            setIsAuthenticated(true);
        }

        return data;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                login,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth debe utilizarse dentro de AuthProvider'
        );
    }

    return context;
}
