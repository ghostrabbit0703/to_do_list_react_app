import Table from '../../../components/common/Table/Table';
import Pagination from '../../../components/common/Pagination/Pagination';

function TaskList({
    tasks,
    loading,
    error,
    pagination,
    onPageChange,
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
                        key: 'title',
                        label: 'Titulo'
                    },
                    {
                        key: 'description',
                        label: 'Descripcion'
                    },
                    {
                        key: 'category',
                        label: 'Categoría',
                        render: (task) => (
                            <span className="badge bg-primary">
                                {task.category?.name || 'Sin categoría'}
                            </span>
                        )
                    },
                    {
                        key: 'tags',
                        label: 'Etiquetas',
                        render: (task) => (
                            <div className="d-flex flex-wrap gap-1">
                                {task.tags && task.tags.length > 0 ? (
                                    <>
                                        {task.tags.slice(0, 3).map((tag) => (
                                            <span key={tag.id} className="badge bg-secondary">
                                                {tag.name}
                                            </span>
                                        ))}
                                        {task.tags.length > 3 && (
                                            <span className="badge bg-light text-dark">
                                                +{task.tags.length - 3}
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    <span className="text-muted">Sin etiquetas</span>
                                )}
                            </div>
                        )
                    },
                    {
                        key: 'completed',
                        label: 'Estado',
                        render: (task) => (
                            <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning'}`}>
                                {task.completed ? 'Completado' : 'Pendiente'}
                            </span>
                        )
                    },
                    {
                        key: 'actions',
                        label: 'Acciones',
                        render: (task) => (
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
                data={tasks}
            />

            <Pagination
                currentPage={pagination.current_page}
                lastPage={pagination.last_page}
                onPageChange={onPageChange}
            />
        </>
    );
}

export default TaskList;