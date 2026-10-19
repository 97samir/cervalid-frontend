import { useNavigate } from "react-router-dom";

export default function useRoleRedirect() {
    const navigate = useNavigate();

    const redirectByRole = (userOrRole) => {
        const user =
        typeof userOrRole === "string"
            ? { role: userOrRole, institutionId: null }
            : userOrRole;

        const role = user?.role;
        const institutionId = user?.institutionId;

        if (role === "SUPER_ADMIN") {
        navigate(institutionId != null ? "/institution" : "/superadmin", {
            replace: true,
        });

        return;
        }

        const routes = {
        INSTITUTION_ADMIN: "/institution",
        INSTITUTION_SUBADMIN: "/institution",
        STUDENT: "/student",
        RECRUITER: "/recruiter",
        };

        const route = routes[role];

        if (route) {
        navigate(route, { replace: true });
        return;
        }

        console.warn("Rol no reconocido:", role);
        navigate("/unauthorized", { replace: true });
    };

    return redirectByRole;
}
