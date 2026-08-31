import Modal from '../../../components/common/Modal/Modal';
import ModalHeader from '../../../components/common/Modal/Modalheader';
import ModalBody from '../../../components/common/Modal/ModalBody';
import ModalFooter from '../../../components/common/Modal/ModalFooter';

function TaskViewModal({
    isOpen,
    onClose,
    task
}) {

    if (!task) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader title="Detalle de Tarea" onClose={onClose} />
            <ModalBody>
                <div className="mb-3">
                    <label className="form-label fw-bold">ID</label>
                    <div className="form-control bg-light">{task.id}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Título</label>
                    <div className="form-control bg-light">{task.title}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Descripción</label>
                    <div className="form-control bg-light">{task.description || 'Sin descripción'}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Categoría</label>
                    <div className="form-control bg-light">{task.category.name}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Completada</label>
                    <span className={`badge ${task.completed ? 'bg-success' : 'bg-danger'}`}>
                        {task.completed ? 'Sí' : 'No'}
                    </span>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Etiquetas</label>
                    <div className="d-flex flex-wrap gap-1">
                        {task.tags.map(tag => (
                            <span key={tag.id} className="badge bg-secondary">{tag.name}</span>
                        ))}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            </ModalFooter>
        </Modal>
    );
}

export default TaskViewModal;