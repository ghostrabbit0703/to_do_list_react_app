import useCategories from '../hooks/useCategories';

import Table from '../../../components/common/Table/Table';

function CategoriesList() {

    const {
        categories,
        loading,
        error
    } = useCategories();

    if (loading) {
        return (
            <div className="text-center p-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">
                        Cargando...
                    </span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }

    return (
        <Table
            columns={[
                {
                    key: 'id',
                    label: 'ID'
                },
                {
                    key: 'name',
                    label: 'Nombre'
                },
                {
                    key: 'actions',
                    label: 'Acciones',
                    render: (category) => (
                        <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-info">
                                Ver
                            </button>

                            <button className="btn btn-sm btn-warning">
                                Editar
                            </button>

                            <button className="btn btn-sm btn-danger">
                                Eliminar
                            </button>
                        </div>
                    )
                }
            ]}
            data={categories}
        />
    );
}

export default CategoriesList;