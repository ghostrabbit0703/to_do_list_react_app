import { useState } from 'react';
import CategoriesList from '../modules/categories/components/CategoriesList';
import CategoryModal from '../modules/categories/components/CategoryModal';
import useCategories from '../modules/categories/hooks/useCategories';
import { useNotification } from '../context/NotificationContext';

function CategoriesPage() {

    const [modalOpen, setModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const { success, error: notifyError } = useNotification();

    const {
        categories,
        loading,
        error,
        pagination,
        createCategory,
        reload
    } = useCategories();

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
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
            />

            <CategoryModal
                isOpen={modalOpen}
                onClose={closeModal}
                onSubmit={handleCreateCategory}
                loading={creating}
            />

        </div>
    );
}

export default CategoriesPage;

