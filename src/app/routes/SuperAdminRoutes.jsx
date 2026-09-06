import { Route } from "react-router-dom";

import RoleGuard from "./RoleGuard";

import SuperAdminDashboardPage from "@/features/superadmin/pages/SuperAdminDashboardPage";
import InstitutionsPage from "@/features/superadmin/institutions/pages/InstitutionsPage";
import InstitutionRequestAdminPage from "@/features/institution-request/pages/InstitutionRequestAdminPage";
import InstitutionUsersPage from "@/features/users/pages/InstitutionUsersPage";

export const superAdminRoutes = (

    <Route element={<RoleGuard allowedRoles={["SUPER_ADMIN"]} />}>

        <Route path="/superadmin" 
            element={<SuperAdminDashboardPage />} />

        <Route path="/superadmin/users" 
            element={<InstitutionUsersPage />} />

        <Route path="/superadmin/institution-requests"
            element={<InstitutionRequestAdminPage />}/>

        <Route path="/superadmin/institutions" 
            element={<InstitutionsPage />} />
            
    </Route>
);
