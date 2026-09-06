import { Route } from "react-router-dom";

import AuthLayout from "@/features/auth/layouts/AuthLayout";

import LoginPage from "@/features/auth/pages/LoginPage";
import SelectInstitutionPage from "@/features/auth/pages/SelectInstitutionPage";
import ActivateAccountPage from "@/features/auth/pages/ActivateAccountPage";
import InstitutionRequestPage from "@/features/institution-request/pages/InstitutionRequestPage";

export const authRoutes = (
    
    <Route element={<AuthLayout />}>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/select-institution" element={<SelectInstitutionPage />} />
        <Route path="/institution-requests"  element={<InstitutionRequestPage />} />
        <Route path="/activate"  element={<ActivateAccountPage />} />
    
    </Route>
        
);
