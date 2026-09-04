import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CategoriesPage from "../pages/CategoriesPage";
import TagsPage from "../pages/TagsPage";
import TasksPage from "../pages/TaskPage";
import API_ENDPOINTS from '../api/endpoints';

function AppRoutes() {
    return (
        <Routes>

            <Route
                path={API_ENDPOINTS.AUTH.LOGIN}
                element={<LoginPage />}
            />

            <Route
                path={API_ENDPOINTS.AUTH.REGISTER}
                element={<RegisterPage />}
            />

            <Route element={<MainLayout />}>

                <Route
                    path={API_ENDPOINTS.CATEGORIES.GET_ALL}
                    element={<CategoriesPage />}
                />

                <Route
                    path={API_ENDPOINTS.TAGS.GET_ALL}   
                    element={<TagsPage />}
                />

                <Route
                    path={API_ENDPOINTS.TASKS.GET_ALL}
                    element={<TasksPage />}
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to={API_ENDPOINTS.AUTH.LOGIN} replace />}
            />

        </Routes>
    );
}

export default AppRoutes;