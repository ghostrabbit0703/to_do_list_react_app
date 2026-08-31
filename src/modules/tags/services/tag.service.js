import apiClient from '../../../api/apiClient';
import API_ENDPOINTS from '../../../api/endpoints';

const tagService = {

    getAll: async (page = 1) => {
        return await apiClient.get(
            `${API_ENDPOINTS.TAGS.GET_ALL}?page=${page}`
        );
    },

    getById: async (id) => {
        return await apiClient.get(
            API_ENDPOINTS.TAGS.GET_BY_ID(id)
        );
    },

    create: async (data) => {
        return await apiClient.post(
            API_ENDPOINTS.TAGS.CREATE,
            data
        );
    },

    update: async (id, data) => {
        return await apiClient.put(
            API_ENDPOINTS.TAGS.UPDATE(id),
            data
        );
    },

    delete: async (id) => {
        return await apiClient.delete(
            API_ENDPOINTS.TAGS.DELETE(id)
        );
    },

};

export default tagService;