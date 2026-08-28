import CategoriesList from '../modules/categories/components/CategoriesList';

function CategoriesPage() {

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    Categorías
                </h1>

                <button className="btn btn-primary">
                    Nueva categoría
                </button>

            </div>

            <CategoriesList />

        </div>
    );
}

export default CategoriesPage;