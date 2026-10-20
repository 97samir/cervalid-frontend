
import { updateUserRole } from "../api/userApi";
import {
    confirmAction,
    successAlert,
} from "../../../core/utils/alerts";
import { getRoleLabel } from "@/shared/utils/roleUtils";

// Roles que se permite asignar desde el selector.
const ASSIGNABLE_ROLES = [
    "STUDENT",
    "INSTITUTION_ADMIN",
    "INSTITUTION_SUBADMIN",
];

const UserRoleSelect = ({ user, refresh }) => {
    const handleChange = async (e) => {
        const selectedRole = e.target.value;

        if (selectedRole === user.role) {
            return;
        }

        const confirmed = await confirmAction(
            `¿Cambiar el rol de ${user.name} ${user.lastName} a ${getRoleLabel(selectedRole)}?`
        );

        if (!confirmed) {
            e.target.value = user.role;
            return;
        }

        try {
            await updateUserRole(
                user.id,
                selectedRole,
                user.institutionId
            );

            successAlert("Rol actualizado correctamente");

            await refresh();
        } catch (error) {
            console.error("Error actualizando rol:", error);
            e.target.value = user.role;
        }
    };

    // rol obtenido del backend
    const currentRoleLabel = getRoleLabel(user.role);

    return (
        <select
            className="form-select form-select-sm"
            value={user.role ?? ""}
            onChange={handleChange}
            aria-label={`Rol de ${user.name} ${user.lastName}`}
        >   
            {/* Conserva el rol actual si no es asignable */}
            {!ASSIGNABLE_ROLES.includes(user.role) && (
                <option value={user.role}>
                    {currentRoleLabel}
                </option>
            )}

            {ASSIGNABLE_ROLES.map((role) => (
                <option key={role} value={role}>
                    {getRoleLabel(role)}
                </option>
            ))}
        </select>
    );
};

export default UserRoleSelect;
