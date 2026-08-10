import { useNavigate } from "react-router-dom";
import useAuthStore from "../../app/store/auth/useAuthStore";
import useRoleRedirect from "../security/useRoleRedirect";
import { switchInstitution } from "../../features/superadmin/api/superAdminApi";

export default function useInstitutionContext() {

    const navigate = useNavigate();
    const { loadUser } = useAuthStore();
    const redirectByRole = useRoleRedirect();

    const enterInstitution = async (inst) => {
        try {
            console.log("Entrando a institución:", inst.id);

            await switchInstitution(inst.id);

            const updatedUser = await loadUser();

            if (!updatedUser) return;

            if (updatedUser.institutionId) {
                navigate("/institution", { replace: true });
                return;
            }

            redirectByRole(updatedUser.role);

        } catch (err) {
            console.error("Error switching institution", err);
        }
    };

    return { enterInstitution };
}