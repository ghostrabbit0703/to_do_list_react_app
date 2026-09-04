// src/modules/tasks/hooks/useTasks.js
import { useCallback, useEffect, useState } from 'react';
import taskService from "../services/task.service";

function useTasks() {
    const [tasks, setTasks] = useState([]); // ✅ Correcto
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });

    const fetchTasks = useCallback(async (page = 1) => {
        try {
            setLoading(true);
            setError(null);
            const response = await taskService.getAll(page);
            setTasks(response.data);
            setPagination(response.pagination);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const createTask = async (taskData) => {
        try {
            setError(null);
            await taskService.create(taskData);
            await fetchTasks(pagination.current_page);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return {
        tasks,
        loading,
        error,
        pagination,
        createTask,
        reload: fetchTasks
    };
}

export default useTasks;