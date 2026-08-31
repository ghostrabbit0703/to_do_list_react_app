import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export const authService = {
    login: (credentials) =>
        apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials),

    register: (data) =>
        apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data),

    logout: () =>
        apiClient.post(API_ENDPOINTS.AUTH.LOGOUT),
};

export default authService;
