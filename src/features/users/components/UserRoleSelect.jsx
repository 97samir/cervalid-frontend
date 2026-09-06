import { updateUserRole } from "../api/userApi";
import { confirmAction, successAlert } from "../../../core/utils/alerts";
import { getRoleLabel } from "@/shared/utils/roleUtils";

const UserRoleSelect = ({ 
    user, 
    refresh 
}) => {

    const handleChange = async (e) => {
        const selectedRole = e.target.value;

        // Si selecciona el mismo rol, no hacemos nada
        if (selectedRole === user.role) {
        return;
        }

        const confirmed = await confirmAction(
        `¿Cambiar el rol de ${user.name} ${user.lastName} a ${getRoleLabel(selectedRole)}?`,
        );

        if (!confirmed) {
        // Restauramos visualmente el valor anterior
        e.target.value = user.role;
        return;
        }

        try {
        await updateUserRole(user.id, selectedRole, user.institutionId);

        successAlert("Rol actualizado correctamente");

        refresh();
        } catch (error) {
        console.error("Error actualizando rol:", error);

        // Restauramos el valor anterior
        e.target.value = user.role;
        }
    };

    return (
        <select
        className="form-select form-select-sm"
        value={user.role}
        onChange={handleChange}
        aria-label={`Rol de ${user.name} ${user.lastName}`}
        >
        <option value="STUDENT">{getRoleLabel("STUDENT")}</option>

        <option value="INSTITUTION_ADMIN">
            {getRoleLabel("INSTITUTION_ADMIN")}
        </option>

        <option value="INSTITUTION_SUBADMIN">
            {getRoleLabel("INSTITUTION_SUBADMIN")}
        </option>
        </select>
    );
};

export default UserRoleSelect;
