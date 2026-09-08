import { useState } from 'react';
import TaskList from '../modules/tasks/components/TaskList';
import TaskModal from '../modules/tasks/components/TaskModal';
import useTasks from '../modules/tasks/hooks/useTask';
import { useNotification } from '../context/NotificationContext';
import useTags from '../modules/tags/hooks/useTags';
import useCategories from '../modules/categories/hooks/useCategories';

function TasksPage() {

    const [modalOpen, setModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const { success, error: notifyError } = useNotification();

    const {
        tasks,
        loading,
        error,
        pagination,
        createTask,
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
    };

    const handleCreateTask = async (taskData) => {
        try {
            setCreating(true);
            await createTask(taskData);
            success('Tarea creada correctamente'); // ✅ Cambiar Etiqueta → Tarea
            closeModal();
        } catch (error) {
            notifyError(error.message || 'No se pudo crear la tarea'); // ✅ Cambiar etiqueta → tarea
        } finally {
            setCreating(false);
        }
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
            />

            <TaskModal
                isOpen={modalOpen}
                onClose={closeModal}
                onSubmit={handleCreateTask}  
                categories={categories}
                tags={tags}
            />
          
        </div>
    );
}

export default TasksPage;