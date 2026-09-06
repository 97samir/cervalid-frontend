import { Route } from "react-router-dom";

import RoleGuard from "./RoleGuard";
import InstitutionGuard from "./InstitutionGuard";
import { academicRoutes } from "./AcademicRoutes";

import InstitutionDashboardPage from "@/features/institution/pages/InstitutionDashboardPage";
import InstitutionProfilePage from "@/features/institution/pages/InstitutionProfilePage";
import InviteUserPage from "@/features/invitations/pages/InviteUserPage";
import InstitutionInvitationsPage from "@/features/invitations/pages/InstitutionInvitationsPage";
import InstitutionUsersPage from "@/features/users/pages/InstitutionUsersPage";

const institutionRoles = [
    "INSTITUTION_ADMIN", 
    "INSTITUTION_SUBADMIN"
];

export const institutionRoutes = (

    <Route element={<RoleGuard allowedRoles={institutionRoles} />}>

        <Route element={<InstitutionGuard />}>

            {/* INSTITUCIÓN */}
            <Route path="/institution" 
                element={<InstitutionDashboardPage />} />

            <Route path="/institution/profile" 
                element={<InstitutionProfilePage />} />

            <Route path="/institution/invite-user" 
                element={<InviteUserPage />} />

            <Route path="/institution/invitations"
                element={<InstitutionInvitationsPage />} />

            <Route path="/institution/users" 
                element={<InstitutionUsersPage />} />

            {/* MÓDULOS ACADÉMICOS */}
            {academicRoutes}
            
        </Route>
    </Route>
);
