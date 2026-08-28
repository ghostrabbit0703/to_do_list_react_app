import { useState } from 'react';

function CategoryForm({ onSubmit, loading = false }) {

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {

        event.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            setError('El nombre de la categoría es obligatorio.');
            return;
        }

        setError('');

        await onSubmit({
            name: trimmedName
        });
    };

    return (
        <form
            id="category-form"
            onSubmit={handleSubmit}
        >

            <div className="mb-3">

                <label
                    htmlFor="categoryName"
                    className="form-label"
                >
                    Nombre
                </label>

                <input
                    type="text"
                    id="categoryName"
                    name="name"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);

                        if (error) {
                            setError('');
                        }
                    }}
                    disabled={loading}
                    placeholder="Ej. Trabajo"
                />

                {error && (
                    <div className="invalid-feedback">
                        {error}
                    </div>
                )}

            </div>

        </form>
    );
}

export default CategoryForm;