import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import CategoriesPage from "../pages/CategoriesPage";
import TagsPage from "../pages/TagsPage";
import API_ENDPOINTS from '../api/endpoints';

function AppRoutes() {
    return (
        <Routes>

            <Route element={<MainLayout />}>

                <Route
                    path={API_ENDPOINTS.CATEGORIES.GET_ALL}
                    element={<CategoriesPage />}
                />

                <Route
                    path={API_ENDPOINTS.TAGS.GET_ALL}
                    element={<TagsPage />}
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to={API_ENDPOINTS.CATEGORIES.GET_ALL} replace />}
            />

        </Routes>
    );
}

export default AppRoutes;