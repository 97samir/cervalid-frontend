// seleccionar la institución activa cuando el usuario pertenece a varias

import { useLocation } from "react-router-dom";
import { selectInstitutionRequest } from "../api/authApi";
import useAuthStore from "../../../app/store/auth/useAuthStore";
import useRoleRedirect from "../../../core/security/useRoleRedirect";

export default function SelectInstitutionPage() {

    const location = useLocation();
    const { loadUser } = useAuthStore();
    const redirectByRole = useRoleRedirect();
    const institutions = location.state?.institutions || [];

    const handleSelect = async (inst) => {

        console.log("Seleccionó institutionUserId:", inst);
        try {

            const payload = {
            // PK de entity (backend) InstitutionUser
            institutionUserId: inst.id ?? inst.institutionUserId, 
            // ID de institución
            institutionId: inst.institutionId,
            };

            console.log("Payload final:", payload);

            if (!payload.institutionUserId || !payload.institutionId) {
                console.error("Faltan datos para enviar al backend");
                return;
            }

            try {
                
                await selectInstitutionRequest(payload);

                console.log("Respuesta backend /select-institution:", payload);
                console.log("guardando token: ", payload.token);
                
                // cargar usuario actualizado
                const updatedUser = await loadUser();

                // redirecciona
                if (updatedUser?.role) {
                    redirectByRole(updatedUser.role);
                }
                
            } catch (err) {
                console.log("Error en seleccionar institución", err);
            }
            
        } catch (err) {
            console.error("Error en selectInstitutionRequest:", err);
        }
    };

    return (
        <div className="container mt-5">
        <h3>Select Institution</h3>

        <div className="list-group mt-4">

            {institutions.map((inst) => (
            <button
                key={inst.institutionUserId}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelect(inst)} // enviar el objeto completo
            >
                {inst.institutionName}
            </button>
            ))}

        </div>
        </div>
    );
}
