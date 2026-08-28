import { useCallback, useEffect, useState } from 'react';

import categoryService from '../services/category.service';

function useCategories() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [editingCategory, setEditingCategory] = useState(null);

    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });

    const fetchCategories = useCallback(async (page = 1) => {

        try {

            setLoading(true);
            setError(null);

            const response = await categoryService.getAll(page);

            setCategories(response.data);

            setPagination(response.pagination);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    }, []);

    const createCategory = async (categoryData) => {

        try {

            setError(null);

            await categoryService.create(categoryData);

            await fetchCategories(pagination.current_page);

        } catch (error) {

            setError(error.message);

            throw error;

        }

    };

    const updateCategory = async (id, categoryData) => {
        try {
            setError(null);
            await categoryService.update(id, categoryData);
            await fetchCategories(pagination.current_page);
            setEditingCategory(null);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

     const setEditCategory = (category) => {
        setEditingCategory(category);
    };

    
    const clearEditCategory = () => {
        setEditingCategory(null);
    };

    useEffect(() => {

        fetchCategories();

    }, [fetchCategories]);

    return {
        categories,
        loading,
        error,
        pagination,
        createCategory,
        updateCategory,      
        editingCategory,    
        setEditCategory,     
        clearEditCategory,   
        reload: fetchCategories
    };
}

export default useCategories;