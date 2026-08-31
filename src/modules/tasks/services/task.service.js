import apiClient from '../../../api/apiClient';
import API_ENDPOINTS from '../../../api/endpoints';

const taskService = {

    getAll: async (page = 1) => {
        return await apiClient.get(
            `${API_ENDPOINTS.TASKS.GET_ALL}?page=${page}`
        );
    },

    create: async (data) => {
            return await apiClient.post(
                API_ENDPOINTS.TASKS.CREATE,
                data
            );
    },


};

export default taskService;