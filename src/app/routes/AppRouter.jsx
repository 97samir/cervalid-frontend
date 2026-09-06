import { BrowserRouter, Routes, Route } from "react-router-dom";

import { publicRoutes } from "./PublicRoutes";
import { authRoutes } from "./AuthRoutes";
import { superAdminRoutes } from "./SuperAdminRoutes";
import { institutionRoutes } from "./InstitutionRoutes";

import PrivateRoute from "./PrivateRoute";
import ProtectedLayout from "@/shared/layouts/ProtectedLayout";

import ScrollToTop from "./ScrollToTop";

export default function AppRouter() {
  return (
    <BrowserRouter>
    <ScrollToTop />

      <Routes>

        {/* RUTAS PÚBLICAS */}
        {publicRoutes}

        {/* AUTENTICACIÓN */}
        {authRoutes}

        {/* RUTAS PRIVADAS */}

        <Route element={
            <PrivateRoute>
              <ProtectedLayout />
            </PrivateRoute>
          }>

          {superAdminRoutes}
          {institutionRoutes}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
