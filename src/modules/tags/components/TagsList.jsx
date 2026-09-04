import useTags from '../hooks/useTags';
import Table from '../../../components/common/Table/Table';
import Pagination from '../../../components/common/Pagination/Pagination';

function TagsList({
    tags,
    loading,
    error,
    pagination,
    onPageChange,
    onViewTag,
    onEditTag,    
    onDeleteTag
}) {
    

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
        <>
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
                        render: (tag) => (
                            <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-info" onClick={() => onViewTag(tag)}>
                                    Ver
                                </button>

                                <button className="btn btn-sm btn-warning" onClick={() => onEditTag(tag)}>
                                    Editar
                                </button>

                                <button className="btn btn-sm btn-danger" onClick={() => onDeleteTag && onDeleteTag(tag.id)}>
                                    Eliminar
                                </button>
                            </div>
                        )
                    }
                ]}
                data={tags}
            />

            <Pagination
                currentPage={pagination.current_page}
                lastPage={pagination.last_page}
                onPageChange={onPageChange}
            />
        </>
    );
}

export default TagsList;