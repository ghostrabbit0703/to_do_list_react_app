import Modal from '../../../components/common/Modal/Modal';
import ModalHeader from '../../../components/common/Modal/Modalheader';
import ModalBody from '../../../components/common/Modal/ModalBody';
import ModalFooter from '../../../components/common/Modal/ModalFooter';

import TaskForm from './TaskForm';

function TaskModal({
    isOpen,
    onClose,
    onSubmit,
    loading = false,
    categories,
    tags,
}) {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >

            <ModalHeader
                title={'Nueva Tarea'}
                onClose={onClose}
            />

            <ModalBody>

                <TaskForm
                    onSubmit={onSubmit}
                    loading={loading}
                    categories={categories}
                    tags={tags}
                />

            </ModalBody>

            <ModalFooter>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    form="task-form"
                    className="btn btn-primary"
                    disabled={loading}
                >
                     {'Guardar'}
                </button>

            </ModalFooter>

        </Modal>
    );
}

export default TaskModal;