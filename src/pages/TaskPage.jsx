import { useState } from 'react';
import TaskList from '../modules/tasks/components/TaskList';
import TaskModal from '../modules/tasks/components/TaskModal';
import useTasks from '../modules/tasks/hooks/useTask';
import { useNotification } from '../context/NotificationContext';
import useTags from '../modules/tags/hooks/useTags';
import useCategories from '../modules/categories/hooks/useCategories';
import TaskViewModal from '../modules/tasks/components/TaskViewModal';
function TasksPage() {
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [taskToView, setTaskToView] = useState(null); 
    const [modalOpen, setModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const { success, error: notifyError } = useNotification();

    const {
        tasks,
        loading,
        error,
        pagination,
        createTask,
        updateTask,
        editingTask,
        setEditTask,
        reload
    } = useTasks();
    const {
        categories
    } = useCategories();

    const {
        tags
    } = useTags();

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditTask(null);
    };

    const handleCreateTask = async (taskData) => {
        try {
            setCreating(true);
            await createTask(taskData);
            success('Tarea creada correctamente');
            closeModal();
        } catch (error) {
            notifyError(error.message || 'No se pudo crear la tarea'); 
        } finally {
            setCreating(false);
        }
    };
    const handleUpdateTask = async (taskData) => {
        try {
            setUpdating(true);
            await updateTask(editingTask.id, taskData);
            success('Tarea actualizada correctamente');
            closeModal();
        } catch (error) {
            notifyError(error.message || 'No se pudo editar la tarea');
        } finally {
            setUpdating(false);
        }
    };

    const handleEditTask = (task) => {
        setEditTask(task);
        setModalOpen(true);
    };
    
    const handleSubmit = editingTask ? handleUpdateTask : handleCreateTask;
    const isLoading = editingTask ? updating : creating;

    const handleViewTask = (task) => {
        setTaskToView(task);
        setViewModalOpen(true);
    };

    const closeViewModal = () => {
        setViewModalOpen(false);
        setTaskToView(null);
    };
    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    Tareas
                </h1>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openModal}
                >
                    Nueva Tarea
                </button>

            </div>

            <TaskList
                tasks={tasks}
                loading={loading}
                error={error}
                pagination={pagination}
                onPageChange={reload}
                onEditTask={handleEditTask}
                onViewTask={handleViewTask}
            />

            <TaskModal
                isOpen={modalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}  
                categories={categories}
                tags={tags}
                loading={isLoading} 
                initialData={editingTask}
                isEditing={!!editingTask}
            />
            <TaskViewModal
                isOpen={viewModalOpen}
                onClose={closeViewModal}
                task={taskToView}
            />
          
        </div>
    );
}

export default TasksPage;