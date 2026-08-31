import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import CategoriesPage from "../pages/CategoriesPage";
import TagsPage from "../pages/TagsPage";

function AppRoutes() {
    return (
        <Routes>

            <Route element={<MainLayout />}>

                <Route
                    path="/categories"
                    element={<CategoriesPage />}
                />

                <Route
                    path="/tags"
                    element={<TagsPage />}
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to="/categories" replace />}
            />

        </Routes>
    );
}

export default AppRoutes;