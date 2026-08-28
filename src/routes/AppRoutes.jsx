import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import CategoriesPage from "../pages/CategoriesPage";


function AppRoutes() {
    return (
        <Routes>

            <Route element={<MainLayout />}>

                <Route
                    path="/categories"
                    element={<CategoriesPage />}
                />

               

            </Route>

            {/* Ruta por defecto */}
            <Route
                path="*"
                element={<Navigate to="/categories" replace />}
            />

        </Routes>
    );
}

export default AppRoutes;