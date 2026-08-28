import Modal from '../../../components/common/Modal/Modal';
import ModalHeader from '../../../components/common/Modal/Modalheader';
import ModalBody from '../../../components/common/Modal/ModalBody';
import ModalFooter from '../../../components/common/Modal/ModalFooter';

import CategoryForm from './CategoryForm';

function CategoryModal({
    isOpen,
    onClose,
    onSubmit,
    loading = false,
    initialData = null,  
    isEditing = false  
}) {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >

            <ModalHeader
                title={isEditing ? 'Editar categoría' : 'Nueva categoría'}
                onClose={onClose}
            />

            <ModalBody>

                <CategoryForm
                    onSubmit={onSubmit}
                    loading={loading}
                    initialData={initialData} 
                    isEditing={isEditing}
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
                    form="category-form"
                    className="btn btn-primary"
                    disabled={loading}
                >
                     {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar')}
                </button>

            </ModalFooter>

        </Modal>
    );
}

export default CategoryModal;