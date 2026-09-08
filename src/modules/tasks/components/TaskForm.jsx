import { useEffect, useState } from 'react';
import Select from 'react-select';
function TaskForm({
    onSubmit,
    loading = false,
    initialData = null,
    categories = [],
    tags = [],
    isEditing = false
}) 
{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [completed, setCompleted] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setCategoryId(initialData.category_id || '');
            setCompleted(initialData.completed || false);
            setSelectedTags(
                initialData.tags
                    ? initialData.tags.map(tag => ({
                        value: tag.id,
                        label: tag.name
                    }))
                    : []
            );
        } else {
            setTitle('');
            setDescription('');
            setCategoryId('');
            setCompleted(false);
            setSelectedTags([]);
        }
        setError('');
    }, [initialData]);

    const tagOptions = tags.map(tag => ({
        value: tag.id,
        label: tag.name
    }));
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            setError('El título de la tarea es obligatorio.');
            return;
        }
        if (!categoryId) {
            setError('Debes seleccionar una categoría.');
            return;
        }

        setError('');

        await onSubmit({
            title: trimmedTitle,
            description: description.trim(),
            category_id: Number(categoryId),
            completed,
            tags: selectedTags.map(tag => tag.value)

        });

    };

    return (

        <form
            id="task-form"
            onSubmit={handleSubmit}
        >
            <div className="mb-3">
                <label
                    htmlFor="taskTitle"
                    className="form-label"
                >
                    Título
                </label>

                <input
                    type="text"
                    id="taskTitle"
                    name="title"
                    className={`form-control ${error && !title.trim() ? 'is-invalid' : ''}`}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                        if (error) {
                             setError('');
                        }
                    }}
                    disabled={loading}
                    placeholder="Ej. Completar proyecto"
                />

            </div>
            <div className="mb-3">
                <label
                    htmlFor="taskDescription"
                    className="form-label"
                >
                    Descripción
                </label>

                <textarea
                    id="taskDescription"
                    name="description"
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }}
                    disabled={loading}
                    placeholder="Describe la tarea..."
                />

            </div>
            <div className="mb-3">
                <label
                    htmlFor="taskCategory"
                    className="form-label"
                >
                    Categoría
                </label>
                <select
                    id="taskCategory"
                    name="category_id"
                    className={`form-select ${error && !categoryId ? 'is-invalid' : ''}`}
                    value={categoryId}
                    onChange={(event) => {
                        setCategoryId(event.target.value);
                        if (error) {
                            setError('');
                        }
                    }}
                    disabled={loading}
                >
                    <option value="">
                        Selecciona una categoría
                    </option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}

                </select>

            </div>
             <div className="mb-3">
                <label className="form-label">
                    Etiquetas
                </label>
                {tags.length === 0 ? (
                    <p className="text-muted">
                        No hay etiquetas disponibles.
                    </p>
                ) : (
                    <Select
                        isMulti
                        name="tags"
                        options={tagOptions}
                        value={selectedTags}
                        onChange={(selected) => setSelectedTags(selected || [])}
                        isDisabled={loading}
                        placeholder="Selecciona etiquetas..."
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                borderColor: error ? '#dc3545' : base.borderColor,
                                '&:hover': {
                                    borderColor: error ? '#dc3545' : base.borderColor
                                }
                            })
                        }}
                    />
                )}
                {error && !selectedTags.length && (
                    <div className="invalid-feedback d-block">
                        {error}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="taskCompleted"
                        checked={completed}
                        onChange={(event) => {
                            setCompleted(event.target.checked);
                        }}
                        disabled={loading}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="taskCompleted"
                    >
                        Tarea completada
                    </label>

                </div>

            </div>
            {error && (
                <div className="alert alert-danger py-2">
                    {error}
                </div>
            )}
        </form>
    );
}

export default TaskForm;