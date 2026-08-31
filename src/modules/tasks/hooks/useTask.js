// src/modules/tasks/hooks/useTasks.js
import { useCallback, useEffect, useState } from 'react';
import taskService from "../services/task.service";

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
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

    const updateTask = async (id, taskData) => {
        try {
            setError(null);
            await taskService.update(id, taskData);
            await fetchTasks(pagination.current_page);
            setEditingTask(null);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const setEditTask = (task) => {
        setEditingTask(task);
    };

    const clearEditTask = () => {
        setEditingTask(null);
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
        editingTask,
        updateTask,
        setEditTask,  
        clearEditTask,
        reload: fetchTasks
    };
}

export default useTasks;