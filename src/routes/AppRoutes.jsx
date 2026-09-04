import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import PrivateRoute from "./PrivateRoute";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CategoriesPage from "../pages/CategoriesPage";
import TagsPage from "../pages/TagsPage";
import TasksPage from "../pages/TaskPage";

function AppRoutes() {
    return (
        <Routes>

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>

                <Route
                    path="/categories"
                    element={<CategoriesPage />}
                />

                <Route
                    path="/tags"
                    element={<TagsPage />}
                />

                <Route
                    path="/task"
                    element={<TasksPage />}
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>
    );
}

export default AppRoutes;