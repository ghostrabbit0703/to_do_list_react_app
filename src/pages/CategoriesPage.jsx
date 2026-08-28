import { useState } from 'react';
import CategoriesList from '../modules/categories/components/CategoriesList';
import CategoryModal from '../modules/categories/components/CategoryModal';
import useCategories from '../modules/categories/hooks/useCategories';
import { useNotification } from '../context/NotificationContext';

function CategoriesPage() {

    const [modalOpen, setModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const { success, error: notifyError } = useNotification();

    const {
        categories,
        loading,
        error,
        pagination,
        createCategory,
        updateCategory,
        editingCategory,
        setEditCategory,
        clearEditCategory,
        reload
    } = useCategories();

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        clearEditCategory(); 
    };

    const handleCreateCategory = async (categoryData) => {

        try {

            setCreating(true);

            await createCategory(categoryData);

            success('Categoría creada correctamente');

            closeModal();

        } catch (error) {

            notifyError(error.message || 'No se pudo crear la categoría');

        } finally {

            setCreating(false);

        }
    };

    const handleUpdateCategory = async (categoryData) => {
        try {
            setUpdating(true);
            await updateCategory(editingCategory.id, categoryData);
            success('Categoría actualizada correctamente');
            closeModal();
        } catch (error) {
            notifyError(error.message || 'No se pudo actualizar la categoría');
        } finally {
            setUpdating(false);
        }
    };

    const handleEditCategory = (category) => {
        setEditCategory(category);
        setModalOpen(true);
    };

    const handleSubmit = editingCategory ? handleUpdateCategory : handleCreateCategory;
    const isLoading = editingCategory ? updating : creating;

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    Categorías
                </h1>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openModal}
                >
                    Nueva categoría
                </button>

            </div>

            <CategoriesList
                categories={categories}
                loading={loading}
                error={error}
                pagination={pagination}
                onPageChange={reload}
                onEditCategory={handleEditCategory}
            />

            <CategoryModal
                isOpen={modalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}  
                loading={isLoading} 
                initialData={editingCategory}
                isEditing={!!editingCategory}
            />

        </div>
    );
}

export default CategoriesPage;

