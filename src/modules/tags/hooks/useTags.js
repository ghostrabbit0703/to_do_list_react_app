import { useCallback, useEffect, useState } from 'react';

import tagService from "../services/tag.service";

function useTags() {

    const [tags, setTags] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [editingTag, setEditingTag] = useState(null);

    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });

    const fetchTags = useCallback(async (page = 1) => {
        try {

            setLoading(true);
            setError(null);

            const response = await tagService.getAll(page);

            setTags(response.data);

            setPagination(response.pagination);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    }, []);

    const createTag = async (tagData) => {

        try {

            setError(null);

            await tagService.create(tagData);

            await fetchTags (pagination.current_page);

        } catch (error) {

            setError(error.message);

            throw error;

        }

    };

    const updateTag = async (id, tagData) => {
        try {
            setError(null);
            await tagService.update(id, tagData);
            await fetchTags(pagination.current_page);
            setEditingTag(null);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const deleteTag = async (id) => {
        try {
            setError(null);
            await tagService.delete(id);
            await fetchTags(pagination.current_page);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const setEditTag = (tag) => {
        setEditingTag(tag);
    };

    
    const clearEditTag = () => {
        setEditingTag(null);
    };

    useEffect(() => {

        fetchTags();

    }, [fetchTags]);

    return {
        tags,
        loading,
        error,
        pagination,
        createTag,
        updateTag,  
        deleteTag,    
        editingTag,    
        setEditTag,     
        clearEditTag,   
        reload: fetchTags
    };
}

export default useTags;