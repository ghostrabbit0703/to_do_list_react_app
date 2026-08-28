import { useCallback, useEffect, useState } from 'react';

import categoryService from '../services/category.service';

function useCategories() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = useCallback(async () => {

        try {

            setLoading(true);
            setError(null);

            const data = await categoryService.getAll();

            setCategories(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        loading,
        error,
        reload: fetchCategories
    };
}

export default useCategories;