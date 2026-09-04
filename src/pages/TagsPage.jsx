import { useState } from 'react';
import TagsList from '../modules/tags/components/TagsList';
import TagModal from '../modules/tags/components/TagModal';
import ConfirmModal from '../components/common/Modal/ConfirmModal';
import useTags from '../modules/tags/hooks/useTags';
import { useNotification } from '../context/NotificationContext';
import TagViewModal from '../modules/tags/components/TagViewModal';

function TagsPage() {

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [tagToView, setTagToView] = useState(null); 
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [tagToDelete, setTagToDelete] = useState(null);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false)
    const { success, error: notifyError } = useNotification();

    const {
        tags,
        loading,
        error,
        pagination,
        createTag,
        updateTag,
        deleteTag, 
        editingTag,
        setEditTag,
        clearEditTag,
        reload
    } = useTags();

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        clearEditTag(); 
    };

    const handleCreateTag = async (tagData) => {

        try {

            setCreating(true);

            await createTag(tagData);

            success('Etiqueta creada correctamente');

            closeModal();

        } catch (error) {

            notifyError(error.message || 'No se pudo crear la etiqueta');

        } finally {

            setCreating(false);

        }
    };

    const handleUpdateTag = async (tagData) => {
        try {
            setUpdating(true);
            await updateTag(editingTag.id, tagData);
            success('Etiqueta actualizada correctamente');
            closeModal();
        } catch (error) {
            notifyError(error.message || 'No se pudo actualizar la etiqueta');
        } finally {
            setUpdating(false);
        }
    };

    const handleEditTag = (tag) => {
        setEditTag(tag);
        setModalOpen(true);
    };

    const handleDeleteTag = (tagId) => {
        const tag = tags.find(t => t.id === tagId);
        setTagToDelete(tag);
        setConfirmModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!tagToDelete) return;
        
        try {
            setDeleting(true);
            await deleteTag(tagToDelete.id);
            setConfirmModalOpen(false);
            setTagToDelete(null);
            success('Etiqueta eliminada correctamente');
        } catch (error) {
            notifyError(error.message || 'No se pudo eliminar la etiqueta');
        } finally {
            setDeleting(false);
        }
    };

    const cancelDelete = () => {
        setConfirmModalOpen(false);
        setTagToDelete(null);
    };

    const handleSubmit = editingTag ? handleUpdateTag : handleCreateTag;
    const isLoading = editingTag ? updating : creating;

    const handleViewTag = (tag) => {
        setTagToView(tag);
        setViewModalOpen(true);
    };

    const closeViewModal = () => {
        setViewModalOpen(false);
        setTagToView(null);
    };
    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    Etiquetas
                </h1>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openModal}
                >
                    Nueva etiqueta
                </button>

            </div>

            <TagsList
                tags={tags}
                loading={loading}
                error={error}
                pagination={pagination}
                onPageChange={reload}
                onViewTag={handleViewTag}
                onEditTag={handleEditTag}
                onDeleteTag={handleDeleteTag}

            />

            <TagModal
                isOpen={modalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}  
                loading={isLoading} 
                initialData={editingTag}
                isEditing={!!editingTag}
            />
            <TagViewModal
                isOpen={viewModalOpen}
                onClose={closeViewModal}
                tag={tagToView}
            />
            <ConfirmModal
                isOpen={confirmModalOpen}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Eliminar etiqueta"
                message={`¿Estás seguro de que deseas eliminar la etiqueta "${tagToDelete?.name || ''}"?`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                loading={deleting}
                variant="danger"
            />

        </div>
    );
}

export default TagsPage;