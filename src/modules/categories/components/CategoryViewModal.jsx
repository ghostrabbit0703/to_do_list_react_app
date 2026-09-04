import Modal from '../../../components/common/Modal/Modal';
import ModalHeader from '../../../components/common/Modal/Modalheader';
import ModalBody from '../../../components/common/Modal/ModalBody';
import ModalFooter from '../../../components/common/Modal/ModalFooter';

function CategoryViewModal({
    isOpen,
    onClose,
    category
}) {

    if (!category) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >

            <ModalHeader
                title="Detalle de categoría"
                onClose={onClose}
            />

            <ModalBody>

                <div className="mb-3">
                    <label className="form-label fw-bold">
                        ID
                    </label>

                    <div className="form-control bg-light">
                        {category.id}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">
                        Nombre
                    </label>

                    <div className="form-control bg-light">
                        {category.name}
                    </div>
                </div>

            </ModalBody>

            <ModalFooter>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    Cerrar
                </button>

            </ModalFooter>

        </Modal>
    );
}

export default CategoryViewModal;