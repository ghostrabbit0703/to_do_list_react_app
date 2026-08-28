import apiClient from '../../../api/apiClient';
import API_ENDPOINTS from '../../../api/endpoints';

const categoryService = {

    getAll: async () => {
        return await apiClient.get(
            API_ENDPOINTS.CATEGORIES.GET_ALL
        );
    },

    getById: async (id) => {
        return await apiClient.get(
            API_ENDPOINTS.CATEGORIES.GET_BY_ID(id)
        );
    },

    create: async (data) => {
        return await apiClient.post(
            API_ENDPOINTS.CATEGORIES.CREATE,
            data
        );
    },

    update: async (id, data) => {
        return await apiClient.put(
            API_ENDPOINTS.CATEGORIES.UPDATE(id),
            data
        );
    },

    delete: async (id) => {
        return await apiClient.delete(
            API_ENDPOINTS.CATEGORIES.DELETE(id)
        );
    },

};

export default categoryService;