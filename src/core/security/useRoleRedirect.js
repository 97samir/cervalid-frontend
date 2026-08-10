// permitir que el frontend redirija al dashboard correcto
// dependiendo del rol del usuario

import { useNavigate } from "react-router-dom";

export default function useRoleRedirect() {
    const navigate = useNavigate();

    const redirectByRole = (role) => {
        const routes = {
        SUPER_ADMIN: "/superadmin",

        INSTITUTION_ADMIN: "/institution",
        INSTITUTION_SUBADMIN: "/institution",

        STUDENT: "/student",
        RECRUITER: "/recruiter",
        };

        // permitir que superadmin tambien acceda a rutas de instituion_admin
        const route = routes[role];

        if (route) {
        navigate(route);
        return;
        }

        console.warn("Rol no reconocido:", role);

        navigate("/unauthorized");
    };

    return redirectByRole;
}
